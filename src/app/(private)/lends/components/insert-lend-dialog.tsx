"use client";

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
import { Dispatch, SetStateAction, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import { LendType } from "../types/lend-type";
import AutocompleteInput from "@/components/autocomplete-input";
import type { Tool } from "../../tools/model";
import type { ExtendedUserType } from "../../users/types/user-type";
import { Calendar } from "@/components/ui/calendar";

interface CreateLendProps {
  tools: Tool[];
  users: ExtendedUserType[];
  form: UseFormReturn<LendType>;
  onSubmit: (values: LendType) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreateLendDialog({
  form,
  open,
  setOpen,
  onSubmit,
  tools,
  users,
}: CreateLendProps) {
  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button className="cursor-pointer m-2">
          Inserir <PlusCircle />
        </Button>
      }
      title="Criar empréstimo"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 mt-4"
        >
          <FormField
            control={form.control}
            name="user.id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Funcionário</FormLabel>
                <FormControl>
                  <AutocompleteInput
                    suggestions={users.map((user) => ({
                      label: user.name,
                      change: user.id,
                    }))}
                    placeholder={"Escolha um funcionário..."}
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tool.id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ferramenta</FormLabel>
                <FormControl>
                  <AutocompleteInput
                    suggestions={tools.map((tool) => ({
                      label: tool.name,
                      change: tool.id,
                    }))}
                    placeholder={"Escolha uma ferramenta..."}
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="limitDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de Entrega</FormLabel>
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button type="submit" className="cursor-pointer">
              Emprestar
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
