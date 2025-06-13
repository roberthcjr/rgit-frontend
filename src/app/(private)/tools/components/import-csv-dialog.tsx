import { CustomDialog } from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { csvSchema } from "../validators/csvInputValidator";
import { TypeOf, z } from "zod";

interface ImportCsvProps {
  form: UseFormReturn<z.infer<typeof csvSchema>>;
  onSubmit: (values: TypeOf<typeof csvSchema>) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function ImportCsvDialog({
  form,
  onSubmit,
  open,
  setOpen,
}: ImportCsvProps) {
  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button className="cursor-pointer m-2" variant="outline">
          Importar por TSV
        </Button>
      }
      title="Importar TSV"
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
                    accept="text/tab-separated-values"
                    onChange={(input) => {
                      const file = input.target.files?.[0];
                      if (file) field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Envie um arquivo tsv para inserir ferramentas em massa.
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
