import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "../hooks/useLogin";

export default function LoginForm() {
  const {form, onSubmit} = useLogin();

  return (
    <div className="flex w-3xl h-64 justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome de Usuário</FormLabel>
                <FormControl>
                  <Input placeholder="usuário" {...field} />
                </FormControl>
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
              </FormItem>
            )}
          />
          <Button type="submit" className="cursor-pointer">Login</Button>
        </form>
      </Form>
    </div>
  );
}
