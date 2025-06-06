"use client";

import { DataTableColumnHeader } from "@/components/data-table/header-table";
import { ColumnDef } from "@tanstack/react-table";
import { type ExtendedLendType } from "./types/lend-type";

export const columns: ColumnDef<ExtendedLendType>[] = [
  {
    accessorKey: "tool.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ferramenta" />
    ),
  },
  {
    accessorKey: "user.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Funcionário" />
    ),
  },
  {
    accessorKey: "user.section",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Seção do funcionário" />
    ),
  },
  {
    accessorKey: "limit_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Entrega" />
    ),
    cell: ({ row }) => {
      const dateFormatted = new Date(row.getValue("limit_date"));
      return dateFormatted.toLocaleDateString("pt-BR");
    },
  },
  {
    id: "close",
  },
];
