import { z } from "zod";
import { Status } from "../model";

const zodEnumValues = Object.keys(Status) as unknown as readonly [
  keyof typeof Status,
  ...(keyof typeof Status)[]
];

export const toolFormSchema = z.object({
  name: z.string({
    required_error: "Um nome para a ferramenta é necessário",
  }),
  status: z.enum(zodEnumValues),
  brand: z.string({
    required_error: "Um nome para a marca é necessário",
  }),
  category: z.string().optional(),
});
