import { z } from "zod";
import type { EditStatus } from "../schemas/edit-tool.schema";

export type StatusEnum = z.infer<typeof EditStatus>;
