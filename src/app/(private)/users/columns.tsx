"use client";

import { ActionsRow } from "@/components/data-table/actions-row";
import { DataTableColumnHeader } from "@/components/data-table/header-table";
import { ColumnDef } from "@tanstack/react-table";
import {  UserType } from "./types/user-type";

function deleteAction(user: UserType) {
  console.log(user);
}
function editAction(user: UserType) {
  console.log(user);
}

export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
  },
  {
    accessorKey: "surname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sobrenome" />
    ),
  },
  {
    accessorKey: "job",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ofício" />
    ),
  },
  {
    accessorKey: "section",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Seção" />
    ),
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsRow<UserType> args={row.original} editAction={editAction} deleteAction={deleteAction} />,
  },
];
