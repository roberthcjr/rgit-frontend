import { z } from "zod";
import { Status } from "../model";

export const toolSchema = z.object({
  name: z.string({
    required_error: "Um nome para a ferramenta é necessário",
  }),
  status: z.nativeEnum(Status),
  brand: z.string({
    required_error: "Um nome para a marca é necessário",
  }),
  category: z.string().optional(),
});
