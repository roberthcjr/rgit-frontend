import "server-only";

import { CustomJwtPayload } from "@/app/(public)/(auth)/types/auth.type";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export function decrypt(token: string): CustomJwtPayload {
  return jwtDecode<JwtPayload>(token);
}

export async function createSession(token: string): Promise<string> {
  const { exp } = decrypt(token);
  const expires = new Date(Date.now() + exp);
  const cookieStore = await cookies();
  cookieStore.set("session", token, { expires, httpOnly: false });

  return "/tools";
}

export async function verifySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) redirect("/login");

  return decrypt(token);
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/login");
}
