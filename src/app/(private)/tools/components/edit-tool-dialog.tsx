import { CustomDialog } from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { type EditToolType } from "../types/insert-tool.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditToolProps {
  form: UseFormReturn<Omit<EditToolType, "id">>;
  onSubmit: (values: Omit<EditToolType, "id">) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function EditToolDialog({
  form,
  open,
  setOpen,
  onSubmit,
}: EditToolProps) {
  return (
    <CustomDialog open={open} onOpenChange={setOpen} title="Editar Usuário">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ferramenta</FormLabel>
                <FormControl>
                  <Input placeholder={"Insira um nome..."} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="AVAILABLE" className="cursor-pointer">
                      Disponível
                    </SelectItem>
                    <SelectItem value="UNAVAILABLE" className="cursor-pointer">
                      Indisponível
                    </SelectItem>
                    <SelectItem value="LENDED" className="cursor-pointer">
                      Emprestada
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
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
