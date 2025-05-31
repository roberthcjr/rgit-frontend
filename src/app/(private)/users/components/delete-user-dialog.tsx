import type { Dispatch, SetStateAction } from "react";
import { CustomDialog } from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";

interface EditUserProps {
  onSubmit: () => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function DeleteUserDialog({ open, setOpen, onSubmit }: EditUserProps) {
  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      title="Tem certeza que deseja deletar esse usuário?"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex flex-col gap-3 mt-8 w-3xs"
      >
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
    </CustomDialog>
  );
}
