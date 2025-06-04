import type { Dispatch, SetStateAction } from "react";
import { CustomDialog } from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";

interface CloseLendDialogProps {
  onSubmit: () => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function CloseLendDialog({
  open,
  setOpen,
  onSubmit,
}: CloseLendDialogProps) {
  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      title="Confirmar devolução do empréstimo"
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
