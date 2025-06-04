import { z } from "zod";
import { LendSchema } from "../schemas/lend-input-schema";

export type LendType = z.infer<typeof LendSchema>;

export type ExtendedLendType = LendType & {
  id: string;
  user: {
    name: string;
    section: string;
  };
  tool: {
    name: string;
  };
};
