import { CustomDialog } from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import type { InsertToolType } from "../types/insert-tool.type";
import { Input } from "@/components/ui/input";

interface InsertToolProps {
  form: UseFormReturn<InsertToolType>;
  onSubmit: (values: InsertToolType) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function InsertToolDialog({
  form,
  open,
  setOpen,
  onSubmit,
}: InsertToolProps) {
  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button className="cursor-pointer m-2">
          Inserir <PlusCircle />
        </Button>
      }
      title="Inserir Ferramenta"
    >
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
            name="category.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Input placeholder={"Insira uma categoria..."} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <Input placeholder={"Insira uma marca..."} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button type="submit" className="cursor-pointer">
              Inserir
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
