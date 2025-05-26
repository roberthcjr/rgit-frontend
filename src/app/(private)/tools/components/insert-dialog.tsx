import { CustomDialog } from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { ToolForm } from "./forms/tool-form";

interface ImportToolProps {
  form: any;
  onSubmit: (values: any) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function InsertToolDialog({
  form,
  onSubmit,
  open,
  setOpen,
}: ImportToolProps) {
  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button className="cursor-pointer m-2" variant="default">
          <CirclePlus />
          Inserir
        </Button>
      }
      title="Inserir nova ferramenta"
    >
      <ToolForm
        form={form}
        onSubmit={onSubmit}
      />
    </CustomDialog>
  );
}
