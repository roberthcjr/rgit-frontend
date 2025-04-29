import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "../validator/login.validator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoginService from "../service";
import { useMemo } from "react";
import { showErrorToast } from "../components/login-toaster";
import { LoginType } from "../model";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const loginService = useMemo(() => new LoginService(), []);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: LoginType) => loginService.login(data),
    onError: (error) => {
      showErrorToast(error.message);
    },
    onSuccess: () => {
      router.push('/tools')
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  });
  
  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    mutation.mutate(data);
  }

  return {form, onSubmit};
}
