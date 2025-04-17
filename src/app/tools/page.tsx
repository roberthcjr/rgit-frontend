"use client";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { CirclePlus, PackageCheck, PackageX } from "lucide-react";
import { tools } from "./mocks/tools.mock";
import { CustomDialog } from "@/components/custom-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const MB_RATIO = 1024 * 1024;
const MAX_FILE_SIZE = 5 * MB_RATIO;
const ACCEPTED_MIME_TYPES = ["text/csv"];

const formSchema = z.object({
  csv: z
    .any()
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      `O arquivo deve ter até ${MAX_FILE_SIZE / MB_RATIO}MB.`
    )
    .refine(
      (file) => ACCEPTED_MIME_TYPES.includes(file?.type),
      `Apenas arquivos no formato ${ACCEPTED_MIME_TYPES.join(
        ","
      )} são suportados.`
    ),
});

export default function Home() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      csv: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      throw new Error("Isso é um erro");
      // Send to api csv process
      console.log(values);
      toast("Importação realizada com sucesso!", {
        icon: <PackageCheck />,
      });
      setOpen(false);
    } catch (error) {
      toast("Importação não pode ser realizada!", {
        icon: <PackageX />,
      });
    }
  }
  return (
    <div className="container">
      <div className="container mx-auto pt-10 pr-5">
        <DataTable columns={columns} data={tools} />
      </div>

      <div className="flex items-end">
        <CustomDialog
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
                          if (file) {
                            field.onChange(file);
                          }
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
              <Button type="submit" className="pointer">
                Importar
              </Button>
            </form>
          </Form>
        </CustomDialog>
        <Button className="cursor-pointer m-2" variant="default">
          <CirclePlus />
          Inserir
        </Button>
      </div>
    </div>
  );
}
