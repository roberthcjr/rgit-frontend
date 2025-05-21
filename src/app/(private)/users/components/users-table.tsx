import { DataTable } from "@/components/data-table/data-table";
import { columns } from "../columns";
import { User } from "../model";

export function UsersTable({ data }: { data: User[] }) {
  return (
    <div className="container mx-auto pr-5">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
