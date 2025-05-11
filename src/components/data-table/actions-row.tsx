import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type ActionsRowProps<T> = {
  rowData: T;
  onEdit: (data: T) => void; // Must match `rowData`'s type
  onDelete: (data: T) => void; // Must match `rowData`'s type
  actions?: {
    label: string;
    onClick: (data: T) => void; // Also matches `rowData`
  }[];
};

export function ActionsRow<T>({
  rowData,
  onEdit,
  onDelete,
  actions,
}: ActionsRowProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onEdit(rowData)}>
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(rowData)}>
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
  );
}
