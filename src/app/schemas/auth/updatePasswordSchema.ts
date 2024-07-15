import { z, TypeOf } from 'zod';

export const passwordRules = [
  {
    regex: /(?=.*[A-Z])/,
    message: 'A senha deve conter ao menos uma letra maiúscula.',
  },
  {
    regex: /(?=.*[a-z])/,
    message: 'A senha deve conter ao menos uma letra minúscula.',
  },
  { regex: /(?=.*\d)/, message: 'A senha deve conter ao menos um número.' },
  {
    regex: /(?=.*[-_!@#$%^&*])/,
    message: 'A senha deve conter ao menos um caractere especial.',
  },
  { regex: /.{8,}/, message: 'A senha deve ter no mínimo 8 caracteres.' },
];

const passwordSchema = z.string().min(1, 'A senha é obrigatória.');

passwordRules.forEach(rule => {
  passwordSchema.regex(rule.regex, rule.message);
});

export const updatePasswordSchema = z
  .object({
    password: passwordSchema,
    passwordConfirmation: z
      .string()
      .min(1, 'A confirmação de senha é obrigatória.'),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'As senhas devem ser iguais.',
    path: ['passwordConfirmation'],
  });

export type TUpdatePasswordSchema = TypeOf<typeof updatePasswordSchema>;
