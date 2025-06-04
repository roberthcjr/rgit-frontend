import { DataTable } from "@/components/data-table/data-table";
import { columns as baseColumns } from "../columns";
import type { CellContext } from "@tanstack/react-table";
import type { ExtendedLendType } from "../types/lend-type";
import { ArrowLeftToLine } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LendsTableProps {
  data: ExtendedLendType[];
  onClose: (lend: ExtendedLendType) => void;
}

export function LendsTable({ data, onClose }: LendsTableProps) {
  const columns = baseColumns.map((column) => {
    if (column.id === "close") {
      return {
        ...column,
        cell: ({ row }: CellContext<ExtendedLendType, unknown>) => {
          return (
            <Button
              className="cursor-pointer"
              variant={"ghost"}
              onClick={() => onClose(row.original)}
            >
              <ArrowLeftToLine />
            </Button>
          );
        },
      };
    }
    return column;
  });

  return (
    <div className="container mx-auto pr-5">
      <DataTable columns={columns} data={data} filter={false} />
    </div>
  );
}
