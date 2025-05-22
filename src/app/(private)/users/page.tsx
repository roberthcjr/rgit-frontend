"use client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import * as crypto from "node:crypto";
import { useMemo, useState } from "react";
import UsersService from "./service";
import { UsersTable } from "./components/users-table";
import { InsertUserDialog } from "./components/insert-user-dialog/insert-user-dialog";
import { useForm } from "react-hook-form";
import { UserType } from "./types/user-type";
import { UserSchema } from "./schemas/user-input-schema";
import { zodResolver } from "@hookform/resolvers/zod";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );
}

function Users() {
  const [open, setOpen] = useState(false);
  // const queryClient = useQueryClient();
  const toolsService = useMemo(() => new UsersService(), []);

  const query = useQuery({
    queryKey: ["tools"],
    queryFn: () => toolsService.getAll(),
  });

  const form = useForm<UserType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      surname: "",
      username: "",
      password: crypto.randomBytes(10).toString("hex"),
      job: "",
      section: "",
    },
  });
  return (
    <>
      <div className="container">
        <UsersTable data={query.data ?? []} />
        <div className="flex items-end">
          <InsertUserDialog form={form} open={open} setOpen={setOpen} />
        </div>
      </div>
    </>
  );
}
