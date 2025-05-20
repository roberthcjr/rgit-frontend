import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "../hooks/useLogin";
import { useActionState } from "react";
import { signIn } from "../../actions/signin";
import { initialState } from "../../types/action.type";

export default function LoginForm() {
  const [state, action, isPending] = useActionState(signIn, initialState);
  const { form } = useLogin();

  return (
    <div className="flex w-3xl h-64 justify-center items-center">
      <Form {...form}>
        <form action={action} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome de Usuário</FormLabel>
                <FormControl>
                  <Input placeholder="usuário" {...field} />
                </FormControl>

                {state?.errors?.username && (
                  <>
                    <FormDescription>{state.errors.username}</FormDescription>
                    <FormMessage />
                  </>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input placeholder="senha" type="password" {...field} />
                </FormControl>
                {state?.errors?.password && (
                  <>
                    <FormDescription>{state.errors.password}</FormDescription>
                    <FormMessage />
                  </>
                )}
              </FormItem>
            )}
          />
          <Button type="submit" className="cursor-pointer" disabled={isPending}>
            {isPending ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
