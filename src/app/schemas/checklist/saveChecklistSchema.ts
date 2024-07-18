import { z, TypeOf } from 'zod';

export const saveChecklistSchema = z.object({
  answers: z.array(
    z
      .object({
        idquestion: z.string(),
        idanswerstype: z.string(),
        idclassification: z.string().optional(),
        comments: z.string().optional(),
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
});

export type TSaveChecklistSchema = TypeOf<typeof saveChecklistSchema>;
