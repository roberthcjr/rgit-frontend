import { CustomDialog } from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormDescription, FormField,
  FormItem, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";

interface ImportCsvProps {
  form: any;
  onSubmit: (values: any) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function ImportCsvDialog({ form, onSubmit, open, setOpen }: ImportCsvProps) {
  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button className="cursor-pointer m-2" variant="outline">
          Importar por CSV
        </Button>
      }
      title="Importar CSV"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          <FormField
            control={form.control}
            name="csv"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="p-20"
                    type="file"
                    accept="text/csv"
                    onChange={(input) => {
                      const file = input.target.files?.[0];
                      if (file) field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Envie um arquivo csv para inserir ferramentas em massa.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Importar</Button>
        </form>
      </Form>
    </CustomDialog>
  );
}
