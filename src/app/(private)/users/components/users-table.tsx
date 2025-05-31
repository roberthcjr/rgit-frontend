import { DataTable } from "@/components/data-table/data-table";
import { columns as baseColumns } from "../columns";
import { UserType, ExtendedUserType } from "../types/user-type";
import { ActionsRow } from "@/components/data-table/actions-row";
import type { CellContext } from "@tanstack/react-table";

interface UsersTableProps {
  data: UserType[];
  onEdit?: (user: ExtendedUserType) => void;
  onDelete?: (user: ExtendedUserType) => void;
}

export function UsersTable({ data, onEdit, onDelete }: UsersTableProps) {
  const columns = baseColumns.map((column) => {
    if (column.id === "actions") {
      return {
        ...column,
        cell: ({ row }: CellContext<UserType, unknown>) => {
          return (
            <ActionsRow<ExtendedUserType>
              args={row.original as ExtendedUserType}
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
