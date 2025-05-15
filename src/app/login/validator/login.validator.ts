import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(6, {
    message: "Nome de usuário deve ter pelo menos 6 caracteres.",
  }),
  password: z.string().min(3, {
    message: "Senha deve ter pelo menos 3 caracteres.",
  }),
});
