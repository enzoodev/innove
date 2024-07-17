import { z, TypeOf } from 'zod';

export const recoverAccountSchema = z.object({
  email: z.string().min(1, 'Informe o email.').email('Email inválido.'),
});

export type TRecoverAccountSchema = TypeOf<typeof recoverAccountSchema>;
