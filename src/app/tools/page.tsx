"use client";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { tools } from "./mocks/tools.mock";
import { CustomDialog } from "@/components/custom-dialog";

export default function Home() {


  return (
    <div className="container">
      <div className="container mx-auto pt-10 pr-5">
        <DataTable columns={columns} data={tools} />
      </div>


      <div className="flex items-end">
        <CustomDialog/>
        <Button className="cursor-pointer m-2" variant="default">
          <CirclePlus />
          Inserir
        </Button>
      </div>
    </div>
  );
}
