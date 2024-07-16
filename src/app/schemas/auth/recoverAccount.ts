import { z, TypeOf } from 'zod';

export const recoverAccountSchema = z.object({
  email: z.string().email('Email inválido.').min(1, 'Informe o email.'),
});

export type TRecoverAccountSchema = TypeOf<typeof recoverAccountSchema>;
