"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTools, useToolsCsv, useToolsQueryClient } from "./hooks/useTools";
import { ToolsTable } from "./components/tools-table";
import { ImportCsvDialog } from "./components/import-csv-dialog";
import { InsertToolDialog } from "./components/insert-dialog";
import { useState } from "react";
import { DeleteDialog } from "@/components/delete-dialog";
import { Skeleton } from "@/components/ui/skeleton";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tools />
    </QueryClientProvider>
  );
}

function Tools() {
  const [openInsertCsv, setOpenInsertCsv] = useState(false);
  const [opentInsertTool, setOpenInsertTool] = useState(false);
  const {data, isPending} = useToolsQueryClient();
  const { form: insertCsvForm, onSubmit: onSubmitCsv } = useToolsCsv({
    setOpen: setOpenInsertCsv,
  });
  const { form: insertForm, onSubmit: onSubmitTool } = useTools({
    setOpen: setOpenInsertTool,
  });

  return (
    <>
      <div className="container">
        <ToolsTable isPeding={isPending} data={data ?? []} />
        <div className="flex items-end">
          <ImportCsvDialog
            open={openInsertCsv}
            setOpen={setOpenInsertCsv}
            form={insertCsvForm}
            onSubmit={onSubmitCsv}
          />
          <InsertToolDialog
            open={opentInsertTool}
            setOpen={setOpenInsertTool}
            form={insertForm}
            onSubmit={onSubmitTool}
          />
        </div>
      </div>
    </>
  );
}
