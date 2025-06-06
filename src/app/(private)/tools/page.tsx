"use client";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { useTools } from "./hooks/useTools";
import { ToolsTable } from "./components/tools-table";
import { ImportCsvDialog } from "./components/import-csv-dialog";
import { useEffect, useMemo, useState } from "react";
import ToolsService from "./service";
import { showErrorToast, showSuccessToast } from "./components/toaster";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertToolSchema } from "./schemas/insert-tool.schema";
import type { EditToolType, InsertToolType } from "./types/insert-tool.type";
import { DeleteToolDialog } from "./components/delete-tool-dialog";
import { InsertToolDialog } from "./components/insert-tool-dialog";
import { EditToolDialog } from "./components/edit-tool-dialog";
import { EditToolSchema } from "./schemas/edit-tool.schema";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tools />
    </QueryClientProvider>
  );
}

function Tools() {
  const [open, setOpen] = useState(false);
  const { query, form, onSubmit } = useTools({ setOpen });
  const toolService = useMemo(() => new ToolsService(), []);

  const [openInsert, setOpenInsert] = useState(false);
  const insertToolMutation = useMutation({
    mutationFn: (data: InsertToolType) => toolService.insertTool(data),
    onError: () => showErrorToast("Algo deu errado ao inserir ferramenta"),
    onSuccess: () => {
      showSuccessToast("Ferramenta inserida com sucesso");
      queryClient.invalidateQueries({ queryKey: ["tools"] });
      setOpenInsert(false);
    },
  });

  const insertForm = useForm<InsertToolType>({
    resolver: zodResolver(InsertToolSchema),
    defaultValues: {
      name: "",
      brand: {
        name: "",
      },
      category: {
        name: "",
      },
    },
  });

  const insertToolFormSubmit = (values: InsertToolType) => {
    insertToolMutation.mutate(values);
  };

  const [editOpen, setEditOpen] = useState(false);
  const [toolToEdit, setToolToEdit] = useState<EditToolType | null>(null);

  const editForm = useForm<Omit<EditToolType, "id">>({
    resolver: zodResolver(EditToolSchema),
    defaultValues: {
      name: "",
      status: "AVAILABLE",
      brand: {
        name: "",
      },
      category: {
        name: "",
      },
    },
  });

  useEffect(() => {
    if (toolToEdit) {
      editForm.reset(toolToEdit);
    }
  }, [toolToEdit, editForm]);

  const editToolMutation = useMutation({
    mutationFn: (data: EditToolType) => toolService.updateTool(data),
    onSuccess: () => {
      showSuccessToast("Ferramenta editado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["tools"] });
      setEditOpen(false);
      setToolToEdit(null);
    },
    onError: () => {
      showErrorToast("Algo deu errado na edição");
    },
  });

  const handleEditTool = (tool: EditToolType) => {
    setToolToEdit(tool);
    setEditOpen(true);
  };

  const submitEditTool = (values: Omit<EditToolType, "id">) => {
    editToolMutation.mutate({
      id: toolToEdit?.id ?? 0,
      ...values,
    });
  };

  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [toolToDelete, settoolToDelete] = useState<number | null>(null);

  const deleteToolMutation = useMutation({
    mutationFn: (id: number) => toolService.delete(id),
    onSuccess: () => {
      showSuccessToast("Usuário deletado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["tools"] });
      setDeleteOpen(false);
      settoolToDelete(null);
    },
    onError: () => {
      showErrorToast("Algo deu errado ao deletar usuário");
    },
  });

  const handleDeleteTool = (tool: EditToolType) => {
    settoolToDelete(tool.id);
    setDeleteOpen(true);
  };

  const submitDeleteTool = () => {
    if (toolToDelete) deleteToolMutation.mutate(toolToDelete);
  };

  return (
    <>
      <div className="container">
        <ToolsTable
          data={query.data ?? []}
          onEdit={handleEditTool}
          onDelete={handleDeleteTool}
        />
        <div className="flex items-end">
          <InsertToolDialog
            form={insertForm}
            open={openInsert}
            setOpen={setOpenInsert}
            onSubmit={insertToolFormSubmit}
          />
          <EditToolDialog
            form={editForm}
            open={editOpen}
            setOpen={setEditOpen}
            onSubmit={submitEditTool}
          />
          <DeleteToolDialog
            onSubmit={submitDeleteTool}
            open={deleteOpen}
            setOpen={setDeleteOpen}
          />
          <ImportCsvDialog
            open={open}
            setOpen={setOpen}
            form={form}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </>
  );
}
