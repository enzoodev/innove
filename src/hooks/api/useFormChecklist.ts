import { useCallback, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from 'react-native-toast-notifications';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ChecklistRepository } from '@/app/repositories/api/ChecklistRepository';
import {
  ChecklistPhotosStorageRepository,
  TChecklistStoragePhoto,
} from '@/app/repositories/local/ChecklistPhotosStorageRepository';
import {
  saveChecklistSchema,
  TSaveChecklistPhotoSchema,
  TSaveChecklistSchema,
} from '@/app/schemas/checklist/saveChecklistSchema';

import { useAppQuery } from '@/hooks/shared/useAppQuery';
import { useAppNavigation } from '@/hooks/shared/useAppNavigation';

type UseFormChecklistParams = TGetChecklistQuestionsParams &
  TGetAnswersTypesParams & {
    executionId: string;
  };

type SetPhotosParams = {
  sectionIndex: number;
  questionIndex: number;
};

type TRespondParams = SetPhotosParams & {
  answerId: string;
};

export type SetPhotoParams = SetPhotosParams & {
  photoUri: string;
};

export type DeletePhotoParams = SetPhotosParams & {
  photoIndex: number;
};

export const useFormChecklist = ({
  idclient,
  idlocal,
  idchecklist,
  executionId,
}: UseFormChecklistParams) => {
  const toast = useToast();
  const navigation = useAppNavigation();

  const { data: answersTypes, isLoading: isLoadingAnswersTypes } = useAppQuery({
    request: () => ChecklistRepository.getAnswersTypes({ idclient }),
    queryKey: 'answersTypes',
    params: { idclient },
    errorMessage: 'Não foi possível buscar as respostas possíveis.',
  });

  const { mutateAsync: getChecklistQuestionsFn, isPending: isLoadingSections } =
    useMutation({
      mutationFn: ChecklistRepository.getChecklistQuestions,
    });

  const { mutateAsync: saveChecklistFn, isPending: isLoadingSaveChecklist } =
    useMutation({
      mutationFn: ChecklistRepository.saveChecklist,
    });

  const generateInitialPhotosState = useCallback(
    (questionId: string | undefined, length = 5) => {
      return Array.from({ length }, () => ({
        executionId,
        checklistId: idchecklist,
        questionId,
        photoUri: null,
      }));
    },
    [executionId, idchecklist],
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TSaveChecklistSchema>({
    resolver: zodResolver(saveChecklistSchema),
    defaultValues: {
      sections: [],
      complementPhotos: generateInitialPhotosState(undefined, 10),
    },
  });

  const {
    fields: complementPhotos,
    append: addComplementPhoto,
    remove: deleteComplementPhoto,
  } = useFieldArray({
    control,
    name: 'complementPhotos',
  });

  const sections = watch('sections');

  const handleRespond = useCallback(
    ({ sectionIndex, questionIndex, answerId }: TRespondParams) => {
      setValue(
        `sections.${sectionIndex}.questions.${questionIndex}.idanswerstype`,
        answerId,
      );
    },
    [setValue],
  );

  const handleOpenSection = useCallback(
    (index: number) => {
      setValue(`sections.${index}.isOpen`, !sections[index].isOpen, {
        shouldDirty: true,
      });
    },
    [sections, setValue],
  );

  const handleSetPhoto = useCallback(
    ({ sectionIndex, questionIndex, photoUri }: SetPhotoParams) => {
      const question = sections[sectionIndex].questions[questionIndex];

      setValue(`sections.${sectionIndex}.questions.${questionIndex}.photos`, [
        ...question.photos,
        {
          executionId,
          checklistId: idchecklist,
          questionId: question.idquestion,
          photoUri,
        },
      ]);
    },
    [executionId, idchecklist, sections, setValue],
  );

  const handleDeletePhoto = useCallback(
    ({ sectionIndex, questionIndex, photoIndex }: DeletePhotoParams) => {
      const question = sections[sectionIndex].questions[questionIndex];
      setValue(
        `sections.${sectionIndex}.questions.${questionIndex}.photos`,
        question.photos.filter((_, index) => index !== photoIndex),
      );
    },
    [sections, setValue],
  );

  const handleSetComplementPhoto = useCallback(
    (photoUri: string) => {
      addComplementPhoto({
        executionId,
        checklistId: idchecklist,
        photoUri,
      });
    },
    [addComplementPhoto, executionId, idchecklist],
  );

  const handleDeleteComplementPhoto = useCallback(
    (photoIndex: number) => {
      deleteComplementPhoto(photoIndex);
    },
    [deleteComplementPhoto],
  );

  const formatPhotosToSend = useCallback(
    (photos: Array<TSaveChecklistPhotoSchema>): Array<TChecklistStoragePhoto> =>
      photos
        .filter(item => !!item.photoUri)
        .map((item, index) => ({
          ...item,
          counter: index + 1,
          photoUri: item.photoUri as string,
        })),
    [],
  );

  const handleFetchQuestions = useCallback(async () => {
    try {
      const sections = await getChecklistQuestionsFn({ idchecklist, idlocal });
      const formattedSections = sections.map((item, index) => ({
        isOpen: index === 0,
        subtitle: item.subtitle,
        questions: item.questions.map(question => ({
          name: question.name,
          idquestion: question.idquestion,
          idanswerstype: '',
          photos: generateInitialPhotosState(question.idquestion),
        })),
      }));

      setValue('sections', formattedSections);
    } catch (error) {
      toast.show('Não foi possível buscar as questões do checklist.', {
        type: 'danger',
        placement: 'top',
      });
    }
  }, [
    generateInitialPhotosState,
    getChecklistQuestionsFn,
    idchecklist,
    idlocal,
    setValue,
    toast,
  ]);

  const onSubmit: SubmitHandler<TSaveChecklistSchema> = useCallback(
    async data => {
      try {
        await saveChecklistFn({
          idchecklist,
          idexecution: executionId,
          answers: data.sections.flatMap(section =>
            section.questions.map(question => ({
              idquestion: question.idquestion,
              idanswerstype: question.idanswerstype,
              idclassification: question.idclassification,
              comments: question.comments,
            })),
          ),
        });

        data.sections.forEach(section => {
          section.questions.forEach(question => {
            formatPhotosToSend(question.photos).forEach(photo => {
              ChecklistPhotosStorageRepository.savePhoto(photo);
            });
          });
        });

        formatPhotosToSend(data.complementPhotos).forEach(photo => {
          ChecklistPhotosStorageRepository.savePhoto(photo);
        });

        navigation.goBack();

        toast.show('Checklist finalizado com sucesso!', {
          type: 'success',
          placement: 'top',
        });
      } catch (error) {
        toast.show('Não foi possível finalizar o checklist.', {
          type: 'danger',
          placement: 'top',
        });
      }
    },
    [
      executionId,
      formatPhotosToSend,
      idchecklist,
      navigation,
      saveChecklistFn,
      toast,
    ],
  );

  const handleSaveChecklist = handleSubmit(onSubmit);

  useEffect(() => {
    handleFetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idchecklist]);

  return {
    sections,
    answersTypes: answersTypes ?? [],
    complementPhotos,
    isLoading: isLoadingSections || isLoadingAnswersTypes,
    isLoadingSaveChecklist,
    control,
    errors,
    handleSaveChecklist,
    handleRespond,
    handleOpenSection,
    handleSetPhoto,
    handleDeletePhoto,
    handleSetComplementPhoto,
    handleDeleteComplementPhoto,
  };
};
