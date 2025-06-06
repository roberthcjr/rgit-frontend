"use client";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useMemo, useState } from "react";
import LendsService from "./service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showErrorToast, showSuccessToast } from "./components/toaster";
import type { ExtendedLendType, LendType } from "./types/lend-type";
import { LendSchema } from "./schemas/lend-input-schema";
import { LendsTable } from "./components/lends-table";
import { CreateLendDialog } from "./components/insert-lend-dialog";
import { CloseLendDialog } from "./components/close-lend-dialog";
import ToolsService from "../tools/service";
import UsersService from "../users/service";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Lends />
    </QueryClientProvider>
  );
}

function Lends() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const lendService = useMemo(() => new LendsService(), []);
  const toolService = useMemo(() => new ToolsService(), []);
  const userService = useMemo(() => new UsersService(), []);

  const lendQuery = useQuery({
    queryKey: ["lends"],
    queryFn: () => lendService.getAll(),
  });

  const userQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getAllWithoutLends(),
  });

  const toolQuery = useQuery({
    queryKey: ["tools"],
    queryFn: () => toolService.getAllAvailable(),
  });

  const insertLendMutation = useMutation({
    mutationFn: (data: LendType) => lendService.insertLend(data),
    onError: () => showErrorToast(),
    onSuccess: () => {
      showSuccessToast();
      queryClient.invalidateQueries({ queryKey: ["lends"] });
      setOpen(false);
    },
  });

  const createLendForm = useForm<LendType>({
    resolver: zodResolver(LendSchema),
    defaultValues: {
      limitDate: new Date(Date.now()),
      user: {
        id: "",
      },
      tool: {
        id: 0,
      },
    },
  });

  const insertLendFormSubmit = (values: LendType) => {
    console.log(values);
    insertLendMutation.mutate(values);
  };

  const [closeLendOpen, setCloseLendOpen] = useState<boolean>(false);
  const [lendToClose, setLendToClose] = useState<ExtendedLendType | null>(null);

  const closeLendMutation = useMutation({
    mutationFn: (id: string) => lendService.close(id),
    onSuccess: () => {
      showSuccessToast("Empréstimo fechado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["lends"] });
      setCloseLendOpen(false);
      setLendToClose(null);
    },
    onError: () => {
      showErrorToast("Algo deu errado ao fechar empréstimo");
    },
  });

  const handleLendClose = (lend: ExtendedLendType) => {
    setLendToClose(lend);
    setCloseLendOpen(true);
  };

  const submitCloseLend = () => {
    closeLendMutation.mutate(lendToClose?.id ?? "");
  };

  return (
    <div className="container">
      <LendsTable data={lendQuery.data ?? []} onClose={handleLendClose} />
      <div className="flex items-end">
        <CreateLendDialog
          tools={toolQuery.data ?? []}
          users={userQuery.data ?? []}
          form={createLendForm}
          open={open}
          setOpen={setOpen}
          onSubmit={insertLendFormSubmit}
        />
        <CloseLendDialog
          onSubmit={submitCloseLend}
          open={closeLendOpen}
          setOpen={setCloseLendOpen}
        />
      </div>
    </div>
  );
}
