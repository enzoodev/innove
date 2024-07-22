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

type AddPhotoParams = SetPhotosParams & {
  photoUri: string;
};

type DeletePhotoParams = SetPhotosParams & {
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
      complementPhotos: [],
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

  const handleOpenSection = useCallback(
    (index: number) => {
      setValue(`sections.${index}.isOpen`, !sections[index].isOpen, {
        shouldDirty: true,
      });
    },
    [sections, setValue],
  );

  const handleAddPhoto = useCallback(
    ({ sectionIndex, questionIndex, photoUri }: AddPhotoParams) => {
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

  const handleAddComplementPhoto = useCallback(
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
      photos.map((item, index) => ({
        ...item,
        counter: index,
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
          photos: [],
        })),
      }));

      setValue('sections', formattedSections);
    } catch (error) {
      toast.show('Não foi possível buscar as questões do checklist.', {
        type: 'danger',
        placement: 'top',
      });
    }
  }, [getChecklistQuestionsFn, idchecklist, idlocal, setValue, toast]);

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
    handleOpenSection,
    handleAddPhoto,
    handleDeletePhoto,
    handleAddComplementPhoto,
    handleDeleteComplementPhoto,
  };
};
