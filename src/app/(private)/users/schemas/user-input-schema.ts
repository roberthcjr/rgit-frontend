import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  surname: z.string().optional(),
  username: z.string(),
  password: z.string(),
  job: z.string(),
  section: z.string(),
});
