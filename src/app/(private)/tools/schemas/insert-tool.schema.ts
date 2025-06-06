import { z } from "zod";

export const InsertToolSchema = z.object({
  name: z.string().min(6, "O nome do usuário deve ter pelo menos 6 caracteres"),
  brand: z.object({
    name: z.string().min(1, "Deve informar marca"),
  }),
  category: z.object({
    name: z.string().min(1, "Deve informar categoria"),
  }),
});
