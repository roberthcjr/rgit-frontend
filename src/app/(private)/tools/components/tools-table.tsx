import { DataTable } from "@/components/data-table/data-table";
import { useToolColumns } from "../columns";
import { Tool } from "../model";

export function ToolsTable({ data, isPeding }: { data: Tool[], isPeding: boolean }) {
  return (
    <div className="container mx-auto pr-5">
      <DataTable isPeding={isPeding} columns={useToolColumns()} data={data} />
    </div>
  );
}
