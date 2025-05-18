"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTools } from "./hooks/useTools";
import { ToolsTable } from "./components/tools-table";
import { ImportCsvDialog } from "./components/import-csv-dialog";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tools />
    </QueryClientProvider>
  );
}

function Tools() {
  const [open, setOpen] = useState(false);
  const { query, form, onSubmit } = useTools({ setOpen });

  return (
    <>
      <div className="container">
        <ToolsTable data={query.data ?? []} />
        <div className="flex items-end">
          <ImportCsvDialog
            open={open}
            setOpen={setOpen}
            form={form}
            onSubmit={onSubmit}
          />
          <Button className="cursor-pointer m-2" variant="default">
            <CirclePlus />
            Inserir
          </Button>
        </div>
      </div>
    </>
  );
}
