import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PackageCheck, PackageX } from "lucide-react";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

type CustomDialogProps = {
  children: ReactNode;
  content: ReactNode;
  title: string;  
}

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

export function CustomDialog() {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer m-2" variant="outline">
          Importar por CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="flex justify-center">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>Importar por CSV</DialogTitle>
          <DialogDescription asChild>
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
