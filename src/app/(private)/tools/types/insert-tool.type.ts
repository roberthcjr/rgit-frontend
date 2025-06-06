import type { z } from "zod";
import type { InsertToolSchema } from "../schemas/insert-tool.schema";
import type { Status } from "../model";

export type InsertToolType = z.infer<typeof InsertToolSchema>;

export type EditToolType = InsertToolType & {
  id: number;
  status: Status;
};
