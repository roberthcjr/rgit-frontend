import { z } from "zod";

export const LendSchema = z.object({
  limitDate: z.date(),
  tool: z.object({
    id: z.number().min(1, "É necessário informar uma ferramenta"),
  }),
  user: z.object({
    id: z.string().min(1, "É necessário informar um funcionário"),
  }),
});
