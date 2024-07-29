import { useCallback, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from 'react-native-toast-notifications';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ChecklistRepository } from '@/repositories/api/ChecklistRepository';
import {
  ChecklistPhotosStorageRepository,
  TSaveChecklistStoragePhotoParams,
} from '@/repositories/local/ChecklistPhotosStorageRepository';
import {
  saveChecklistSchema,
  TSaveChecklistPhotoSchema,
  TSaveChecklistSchema,
} from '@/schemas/checklist/saveChecklistSchema';

import { useAppQuery } from '@/hooks/shared/useAppQuery';
import { useAppNavigation } from '@/hooks/shared/useAppNavigation';
import { photosQuantityPerSection } from '@/utils/constants/photosQuantityPerSection';

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

type TClassificateParams = SetPhotosParams & {
  classificationId: string;
};

export type SetComplementPhotoParams = {
  photoUri: string;
  photoIndex: number;
};

export type DeleteComplementPhotoParams = {
  photoIndex: number;
};

export type SetPhotoParams = SetComplementPhotoParams & SetPhotosParams;

export type DeletePhotoParams = DeleteComplementPhotoParams & SetPhotosParams;

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
    (
      questionId: string | undefined,
      length = photosQuantityPerSection.question,
    ) => {
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
      complement: {
        isOpen: false,
        photos: generateInitialPhotosState(
          undefined,
          photosQuantityPerSection.complement,
        ),
      },
    },
  });

  const sections = watch('sections');
  const complement = watch('complement');

  const handleRespond = useCallback(
    ({ sectionIndex, questionIndex, answerId }: TRespondParams) => {
      setValue(
        `sections.${sectionIndex}.questions.${questionIndex}.idanswerstype`,
        answerId,
      );
    },
    [setValue],
  );

  const handleClassificate = useCallback(
    ({
      sectionIndex,
      questionIndex,
      classificationId,
    }: TClassificateParams) => {
      setValue(
        `sections.${sectionIndex}.questions.${questionIndex}.idclassification`,
        classificationId,
      );
    },
    [setValue],
  );

  const handleOpenSection = useCallback(
    (index: number) => {
      sections.forEach((_, sectionIndex) => {
        setValue(`sections.${sectionIndex}.isOpen`, index === sectionIndex, {
          shouldDirty: true,
        });
      });
      setValue('complement.isOpen', false);
    },
    [sections, setValue],
  );

  const handleOpenComplementSection = useCallback(() => {
    setValue('complement.isOpen', true);
    sections.forEach((_, sectionIndex) => {
      setValue(`sections.${sectionIndex}.isOpen`, false, {
        shouldDirty: true,
      });
    });
  }, [sections, setValue]);

  const handleSetPhoto = useCallback(
    ({ sectionIndex, questionIndex, photoUri, photoIndex }: SetPhotoParams) => {
      setValue(
        `sections.${sectionIndex}.questions.${questionIndex}.photos.${photoIndex}.photoUri`,
        photoUri,
      );
    },
    [setValue],
  );

  const handleDeletePhoto = useCallback(
    ({ sectionIndex, questionIndex, photoIndex }: DeletePhotoParams) => {
      setValue(
        `sections.${sectionIndex}.questions.${questionIndex}.photos.${photoIndex}.photoUri`,
        null,
      );
    },
    [setValue],
  );

  const handleSetComplementPhoto = useCallback(
    ({ photoUri, photoIndex }: SetComplementPhotoParams) => {
      setValue(`complement.photos.${photoIndex}.photoUri`, photoUri);
    },
    [setValue],
  );

  const handleDeleteComplementPhoto = useCallback(
    ({ photoIndex }: DeleteComplementPhotoParams) => {
      setValue(`complement.photos.${photoIndex}.photoUri`, null);
    },
    [setValue],
  );

  const formatPhotosToSend = useCallback(
    (
      photos: Array<TSaveChecklistPhotoSchema>,
    ): Array<TSaveChecklistStoragePhotoParams> =>
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

        formatPhotosToSend(data.complement.photos).forEach(photo => {
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
    complement,
    isLoading: isLoadingSections || isLoadingAnswersTypes,
    isLoadingSaveChecklist,
    control,
    errors,
    handleSaveChecklist,
    handleRespond,
    handleClassificate,
    handleOpenSection,
    handleOpenComplementSection,
    handleSetPhoto,
    handleDeletePhoto,
    handleSetComplementPhoto,
    handleDeleteComplementPhoto,
  };
};
