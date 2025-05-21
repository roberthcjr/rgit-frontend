import { CustomDialog } from "@/components/custom-dialog";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";
import { DialogFooter } from "./ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

interface DeleteProps {
  title: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function DeleteDialog({ open, setOpen, title }: DeleteProps) {
  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      title={`Deletar ${title}`}
      hasFooter={true}
    >
      <p>Deseja deletar o item '{title}'? Essa ação é irreversível</p>
    </CustomDialog>
  );
}
