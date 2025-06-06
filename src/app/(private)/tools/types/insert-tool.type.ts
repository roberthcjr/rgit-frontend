import type { z } from "zod";
import type { InsertToolSchema } from "../schemas/insert-tool.schema";
import type { StatusEnum } from "./edit-tool.type";

export type InsertToolType = z.infer<typeof InsertToolSchema>;

export type EditToolType = InsertToolType & {
  id: number;
  status: StatusEnum;
};
