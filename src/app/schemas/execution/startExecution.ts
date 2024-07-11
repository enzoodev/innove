import { z, TypeOf } from 'zod';

export const startExecutionSchema = z.object({
  local: z
    .object({
      idlocal: z.number(),
      idtipo: z.number(),
    })
    .refine(value => value !== undefined, {
      message: 'O local é obrigatório.',
    }),
});

export type TStartExecutionSchema = TypeOf<typeof startExecutionSchema>;
