import { DataTable } from "@/components/data-table/data-table";
import { columns as baseColumns } from "../columns";
import { Tool } from "../model";
import type { EditToolType } from "../types/insert-tool.type";
import type { CellContext } from "@tanstack/react-table";
import { ActionsRow } from "@/components/data-table/actions-row";

interface ToolsTableProps {
  data: Tool[];
  onEdit?: (tool: EditToolType) => void;
  onDelete?: (tool: EditToolType) => void;
}

export function ToolsTable({ data, onEdit, onDelete }: ToolsTableProps) {
  const columns = baseColumns.map((column) => {
    if (column.id === "actions") {
      return {
        ...column,
        cell: ({ row }: CellContext<Tool, unknown>) => {
          return (
            <ActionsRow<EditToolType>
              args={row.original as EditToolType}
              editAction={onEdit ?? (() => {})}
              deleteAction={onDelete ?? (() => {})}
            />
          );
        },
      };
    }
    return column;
  });

  return (
    <div className="container mx-auto pr-5">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
