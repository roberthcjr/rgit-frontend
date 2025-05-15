"use server";

import { LoginSchema } from "@/app/(public)/(auth)/login/validator/login.validator";
import AuthenticationService from "@/app/(public)/(auth)/login/service";
import { createSession } from "@/app/(public)/(auth)/_lib/session";
import { redirect } from "next/navigation";

export async function signIn(state, formData: FormData) {
  let path = "/";
  try {
    const validationResult = LoginSchema.safeParse({
      username: formData.get("username"),
      password: formData.get("password"),
    });

    if (!validationResult.success)
      return { errors: validationResult.error.flatten().fieldErrors };

    const { username, password } = validationResult.data;
    const authenticationService = new AuthenticationService();

    const { access_token: accessToken } = await authenticationService.login({
      username,
      password,
    });

    path = await createSession(accessToken);
  } catch (error) {
    console.error(error);
  } finally {
    redirect(path);
  }
}
