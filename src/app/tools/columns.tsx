"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Tools = {
    id: string
    name: string
    status: "available" | "unavailable" | "lended"
    brand: string
    category?: string
    insertedAt?: string
  }

export const columns: ColumnDef<Tools>[] = [
    {
        accessorKey: "name",
        header: "Nome",
    },
    {
        accessorKey: "category",
        header: "Categoria",
    },
    {
        accessorKey: "brand",
        header: "Marca",
    },
    {
        accessorKey: "insertedAt",
        header: "Compra",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
]
