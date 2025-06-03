"use client";

import { Delete, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Dispatch, SetStateAction, useState } from "react";
import { DeleteDialog } from "../delete-dialog";
import { CustomDialog } from "../custom-dialog";
import { ToolForm } from "@/app/(private)/tools/components/forms/tool-form";

type ActionsRowProps<T> = {
  rowData: T;
  deleteProps: {
    onSubmit: (data: T) => void;
    openDelete: boolean;
    setDelete: Dispatch<SetStateAction<boolean>>;
  }; // Must match `rowData`'s type
  editProps: {
    onSubmit: (data: T) => void;
    openEdit: boolean;
    setEdit: Dispatch<SetStateAction<boolean>>;
  }; // Must match `rowData`'s type
  actions?: {
    label: string;
    onClick: (data: T) => void; // Also matches `rowData`
  }[];
  editForm?: React.ReactNode;
  title: string;
};

export function ActionsRow<T>({
  rowData,
  editProps,
  deleteProps,
  actions,
  title,
  editForm
}: ActionsRowProps<T>) {
  const { onSubmit:onDelete, openDelete, setDelete } = deleteProps;
  const { openEdit, setEdit } = editProps;

  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="cursor-pointer h-8 w-8 p-0">
            <span className="sr-only">Abrir Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={() => setEdit(true)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setDelete(true)}>
            Deletar
          </DropdownMenuItem>
          {!!actions && actions.length > 0 && (
            <>
              <DropdownMenuSeparator />
              {actions?.map((action, index) => (
                <div key={index}>
                  <DropdownMenuItem onClick={() => action.onClick(rowData)}>
                    {action.label}
                  </DropdownMenuItem>
                </div>
              ))}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialog
        title={title}
        open={openDelete}
        setOpen={setDelete}
        onDelete={() => {
          onDelete(rowData);
        }}
      ></DeleteDialog>
      <CustomDialog
        open={openEdit}
        onOpenChange={setEdit}
        title={`Editar ${title}`}
      >
        {editForm}
      </CustomDialog>
    </>
  );
}
