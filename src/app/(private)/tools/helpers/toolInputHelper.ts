import { z } from "zod";
import { toolFormSchema } from "../validators/toolInputValidator";

export const toolSchema = toolFormSchema.extend({
  brand: z.string().transform((brandName) => ({ name: brandName })),
  category: z
    .string()
    .optional()
    .transform((category) => (category ? { name: category } : undefined)),
});
