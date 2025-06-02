import { CustomDialog } from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import InsertUserFormField from "./form-field-user";
import { UserType, type ExtendedUserType } from "../../types/user-type";

interface EditUserProps {
  form: UseFormReturn<Omit<ExtendedUserType, "id">>;
  onSubmit: (values: Omit<ExtendedUserType, "id">) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function EditUserDialog({
  form,
  open,
  setOpen,
  onSubmit,
}: EditUserProps) {
  const insertFormFields = {
    name: "Nome",
    surname: "Sobrenome",
    job: "Ofício",
    section: "Seção",
    username: "Nome de usuário",
    password: "Senha",
  };
  return (
    <CustomDialog open={open} onOpenChange={setOpen} title="Editar Usuário">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 mt-4"
        >
          {(Object.keys(insertFormFields) as Array<keyof UserType>).map(
            (key) => {
              return (
                <InsertUserFormField
                  formControl={form.control}
                  fieldName={key}
                  label={insertFormFields[key]}
                  key={key}
                />
              );
            },
          )}
          <div className="flex justify-between">
            <Button type="submit" className="cursor-pointer">
              Confirmar
            </Button>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </CustomDialog>
  );
}
