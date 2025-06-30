import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "./ui/dialog";
import { DialogHeader } from "./ui/dialog";
import { ReactNode } from "react";
import { DialogProps } from "@radix-ui/react-dialog";

interface CustomDialogProps extends DialogProps {
  children: ReactNode;
  trigger?: ReactNode;
  title: string;
}

export function CustomDialog({
  children,
  trigger,
  title,
  open,
  onOpenChange,
}: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="flex flex-col justify-center items-center w-xs">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
