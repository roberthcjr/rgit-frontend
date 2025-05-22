"use server";

import { Action, State } from "../types/action.type";
import { UserSchema } from "../schemas/user-input-schema";
import UsersService from "../service";
import { cookies } from "next/headers";

export const insertUser: Action = async (
  state: State,
  formData: FormData,
): Promise<State> => {
  try {
    const validationResult = UserSchema.safeParse({
      name: formData.get("name"),
      surname: formData.get("surname"),
      username: formData.get("username"),
      password: formData.get("password"),
      job: formData.get("job"),
      section: formData.get("section"),
    });

    if (!validationResult.success) {
      return {
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const { name, surname, username, password, job, section } =
      validationResult.data;
    const usersService = new UsersService();

    const cookiesStore = await cookies();
    const token = cookiesStore.get("session")?.value;

    await usersService.insertUser(
      {
        name,
        surname,
        username,
        password,
        job,
        section,
      },
      token,
    );

    return {
      errors: {
        username: ["Usuário inserido com sucesso"],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      errors: {
        username: [String(error)],
      },
    };
  }
};
