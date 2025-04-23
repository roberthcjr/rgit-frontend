"use client";

import { ActionsRow } from "@/components/data-table/actions-row";
import { DataTableColumnHeader } from "@/components/data-table/header-table";
import { SimpleTooltip } from "@/components/simple-tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheckBig, CircleFadingArrowUp, CircleMinus } from "lucide-react";
import { ReactNode } from "react";

enum Status {
  AVAILABLE = "Disponível",
  UNAVAILABLE = "Indisponível",
  LENDED = "Emprestada",
}

export type Tools = {
  id: string;
  name: string;
  status: Status;
  brand: string;
  category?: string;
  insertedAt?: string;
};

const statusMap: Record<string, Status> = {
  AVAILABLE: Status.AVAILABLE,
  UNAVAILABLE: Status.UNAVAILABLE,
  LENDED: Status.LENDED,
};

const statusIconMap: Record<string, ReactNode> = {
  AVAILABLE: <SimpleTooltip message={statusMap["AVAILABLE"]}><CircleCheckBig/></SimpleTooltip>,
  UNAVAILABLE: <SimpleTooltip message={statusMap["UNAVAILABLE"]}><CircleMinus/></SimpleTooltip>,
  LENDED: <SimpleTooltip message={statusMap["LENDED"]}><CircleFadingArrowUp/></SimpleTooltip>,
};

export const columns: ColumnDef<Tools>[] = [
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
    cell: ({ row }) => <ActionsRow payment={row} />,
  },
];
