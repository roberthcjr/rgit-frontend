"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export type Tools = {
    id: string
    name: string
    status: Status
    brand: string
    category?: string
    insertedAt?: string
  }

export enum Status {
    available = "Disponível", 
    unavailable =  "Indisponível",
    lended =  "Emprestada"
}



export const columns: ColumnDef<Tools>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Nome
                <ArrowUpDown />
              </Button>
            )
          },
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Categoria
                <ArrowUpDown />
              </Button>
            )
          },
    },
    {
        accessorKey: "brand",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Marca
                <ArrowUpDown />
              </Button>
            )
          },
    },
    {
        accessorKey: "insertedAt",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Data de Compra
                <ArrowUpDown />
              </Button>
            )
          },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown />
          </Button>
        )
      },
    },
]
