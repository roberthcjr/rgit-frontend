"use client";

import { DataTableColumnHeader } from "@/components/data-table/header-table";
import { SimpleTooltip } from "@/components/simple-tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheckBig, CircleFadingArrowUp, CircleMinus } from "lucide-react";
import { ReactNode } from "react";
import { statusMap, Tool } from "./model";

const statusIconMap: Record<string, ReactNode> = {
  AVAILABLE: (
    <SimpleTooltip message={statusMap["AVAILABLE"]}>
      <CircleCheckBig />
    </SimpleTooltip>
  ),
  UNAVAILABLE: (
    <SimpleTooltip message={statusMap["UNAVAILABLE"]}>
      <CircleMinus />
    </SimpleTooltip>
  ),
  LENDED: (
    <SimpleTooltip message={statusMap["LENDED"]}>
      <CircleFadingArrowUp />
    </SimpleTooltip>
  ),
};

export const columns: ColumnDef<Tool>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
  },
  {
    accessorKey: "category.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoria" />
    ),
  },
  {
    accessorKey: "brand.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Marca" />
    ),
  },
  {
    accessorKey: "inserted_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data de Compra" />
    ),
    cell: ({ row }) => {
      const dateFormatted = new Date(row.getValue("inserted_at"));
      return dateFormatted.toLocaleDateString("pt-BR");
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const statusRaw: string = row.getValue("status");
      return statusIconMap[statusRaw];
    },
  },
  {
    id: "actions",
  },
];
