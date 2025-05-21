"use client";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useMemo } from "react";
import UsersService from "./service";
import { UsersTable } from "./components/users-table";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );
}

function Users() {
  // const queryClient = useQueryClient();
  const toolsService = useMemo(() => new UsersService(), []);

  const query = useQuery({
    queryKey: ["tools"],
    queryFn: () => toolsService.getAll(),
  });
  return (
    <>
      <div className="container">
        <UsersTable data={query.data ?? []} />
        <div className="flex items-end">
          <Button className="cursor-pointer m-2" variant="default">
            <CirclePlus />
            Inserir
          </Button>
        </div>
      </div>
    </>
  );
}
