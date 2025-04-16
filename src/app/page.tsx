'use-client'

import { Tools,columns } from "./tools/columns";
import { DataTable } from "./tools/data-table";
import {Button} from "@/components/ui/button";
import {CirclePlus} from "lucide-react";

const tools: Tools[] = [
  {
    id: "728ed52f",
    name: "Escada",
    status: "available",
    brand: "m@example.com",
    insertedAt: new Date().toLocaleDateString("pt-BR")
  },
  {
    id: "489e1d42",
    name: "Escada",
    status: "unavailable",
    brand: "example@gmail.com",
    category: "Jardinagem"
  },
]

export default function Home() {
  return (
    <>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={tools} />
        <div className="container items-end">
          <Button className="m-1 cursor-pointer" variant="outline">Importar por CSV</Button>
          <Button className="m-1 cursor-pointer" variant="default"><CirclePlus/>Inserir</Button>
        </div>
      </div>
    </>

  );
}
