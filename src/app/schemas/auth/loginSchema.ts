import { z, TypeOf } from 'zod';

export const loginSchema = z.object({
  login: z.string().min(1, 'O usuário é obrigatório.'),
  password: z.string().min(1, 'A senha é obrigatória.'),
});

export type TLoginSchema = TypeOf<typeof loginSchema>;
