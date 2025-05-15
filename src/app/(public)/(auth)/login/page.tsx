"use client";
import LoginForm from "./components/login-form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  );
}

function Login() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <LoginForm/>
    </div>
  );
}
