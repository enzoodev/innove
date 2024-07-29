import { z, TypeOf } from 'zod';

const photoSchema = z.object({
  executionId: z.string(),
  checklistId: z.string(),
  questionId: z.string().optional(),
  photoUri: z.string().nullable(),
});

const questionSchema = z
  .object({
    idquestion: z.string(),
    idanswerstype: z.string().min(1, 'Selecione uma resposta.'),
    idclassification: z.string().optional(),
    comments: z.string().optional(),
    name: z.string(),
    photos: z.array(photoSchema),
  })
  .refine(
    data => {
      if (data.idanswerstype === '2') {
        return data.photos.some(item => !!item.photoUri);
      }
      return true;
    },
    {
      message:
        'Adicione pelo menos uma foto quando a resposta for não conforme.',
      path: ['photos'],
    },
  )
  .refine(
    data => {
      if (data.idanswerstype === '2') {
        return data.idclassification !== undefined;
      }
      return true;
    },
    {
      message:
        'Informe a classificação para a questão quando a resposta for não conforme.',
      path: ['idclassification'],
    },
  )
  .refine(
    data => {
      if (data.idanswerstype === '2') {
        return data.comments !== undefined;
      }
      return true;
    },
    {
      message:
        'Escreva uma justificativa para a questão quando a resposta for não conforme.',
      path: ['comments'],
    },
  );

export const sectionSchema = z.object({
  subtitle: z.string(),
  isOpen: z.boolean(),
  questions: z.array(questionSchema),
});

export const saveChecklistSchema = z.object({
  sections: z.array(sectionSchema),
  complement: z.object({
    isOpen: z.boolean(),
    photos: z.array(photoSchema),
  }),
});

export type TSaveChecklistPhotoSchema = TypeOf<typeof photoSchema>;

export type TSaveChecklistQuestionSchema = TypeOf<typeof questionSchema>;

export type TSaveChecklistSectionSchema = TypeOf<typeof sectionSchema>;

export type TSaveChecklistSchema = TypeOf<typeof saveChecklistSchema>;
