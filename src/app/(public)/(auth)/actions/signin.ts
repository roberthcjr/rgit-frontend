"use server";

import { LoginSchema } from "@/app/(public)/(auth)/login/validator/login.validator";
import AuthenticationService from "@/app/(public)/(auth)/login/service";
import { createSession } from "@/app/(public)/(auth)/_lib/session";
import { redirect } from "next/navigation";
import { Action, State } from "../types/action.type";

export const signIn: Action = async (state: State, formData: FormData) => {
  let path;
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
    // Retorna erro genérico em caso de falha na autenticação ou outro erro
    return {
      errors: {
        username: ["Erro inesperado. Tente novamente."],
      },
    };
  }

  // Se chegou até aqui e há path, faz o redirect
  if (path) redirect(path);

  // Fallback se não redirecionar por algum motivo (não esperado)
  return {
    errors: {
      username: ["Não foi possível redirecionar."],
    },
  };
};
