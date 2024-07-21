import { z, TypeOf } from 'zod';

const photoSchema = z
  .object({
    executionId: z.string(),
    checklistId: z.string(),
    questionId: z.string().optional(),
    counter: z.number().optional(),
    photoUri: z.string(),
  })
  .refine();

export const saveChecklistSchema = z.object({
  sections: z.array(
    z.object({
      subtitle: z.string(),
      questions: z.array(
        z
          .object({
            idquestion: z.string(),
            idanswerstype: z.string(),
            idclassification: z.string().optional(),
            comments: z.string().optional(),
            name: z.string(),
            photos: z.array(photoSchema),
          })
          .refine(
            data => {
              if (data.idanswerstype === '1') {
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
              if (data.idanswerstype === '1') {
                return data.comments !== undefined;
              }
              return true;
            },
            {
              message:
                'Escreva um comentário para a questão quando a resposta for não conforme.',
              path: ['comments'],
            },
          ),
      ),
    }),
  ),
  complementPhotos: z.array(photoSchema),
});

export type TSaveChecklistPhotoSchema = TypeOf<typeof photoSchema>;

export type TSaveChecklistSchema = TypeOf<typeof saveChecklistSchema>;
