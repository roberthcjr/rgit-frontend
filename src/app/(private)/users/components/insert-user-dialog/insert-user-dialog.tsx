import { CustomDialog } from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Dispatch, SetStateAction, useActionState } from "react";
import { UseFormReturn } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import { initialState } from "../../types/action.type";
import InsertUserFormField from "./form-field-user";
import { UserType } from "../../types/user-type";
import { insertUser } from "../../actions/insertUser";

interface InsertUserProps {
  form: UseFormReturn<UserType>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function InsertUserDialog({ form, open, setOpen }: InsertUserProps) {
  const [state, action, isPending] = useActionState(insertUser, initialState);
  const insertFormFields = {
    name: "Nome",
    surname: "Sobrenome",
    job: "Ofício",
    section: "Seção",
    username: "Nome de usuário",
    password: "Senha",
  };
  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button className="cursor-pointer m-2">
          Inserir <PlusCircle />
        </Button>
      }
      title="Inserir Usuário"
    >
      <Form {...form}>
        <form action={action} className="flex flex-col gap-3 mt-4">
          {(Object.keys(insertFormFields) as Array<keyof UserType>).map(
            (key) => {
              return (
                <InsertUserFormField
                  formControl={form.control}
                  fieldName={key}
                  label={insertFormFields[key]}
                  state={state}
                  key={key}
                />
              );
            },
          )}
          <div className="flex justify-between">
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isPending}
            >
              {isPending ? "Inserindo..." : "Inserir"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              disabled={isPending}
              onClick={() => setOpen(false)}
            >
              {isPending ? "Inserindo..." : "Cancelar"}
            </Button>
          </div>
        </form>
      </Form>
    </CustomDialog>
  );
}
