"use client";

import { ActionsRow } from "@/components/data-table/actions-row";
import { DataTableColumnHeader } from "@/components/data-table/header-table";
import { SimpleTooltip } from "@/components/simple-tooltip";
import { ColumnDef, RowExpanding } from "@tanstack/react-table";
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

// Quando definir um columns e desejar ter ações,
// escrever o métodos onEdit e onDelete
const onEdit = (data: Tool) => {};

const onDelete = (data: Tool) => {};

export const columns: ColumnDef<Tool>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoria" />
    ),
  },
  {
    accessorKey: "brand",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Marca" />
    ),
  },
  {
    accessorKey: "insertedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data de Compra" />
    ),
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
    cell: ({ row }) => {
      return (
        <ActionsRow
          rowData={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );
    },
  },
];
