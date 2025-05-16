import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useMemo } from "react";
import ToolsService from "../service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { csvSchema } from "../validators/csvInputValidator";
import { toolSchema } from "../validators/toolInputValidator";
import { Status } from "../model";
import { z } from "zod";
import { showErrorToast, showSuccessToast } from "../components/toaster";

type UseTools = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function useToolsQueryClient() {
  const toolsService = useMemo(() => new ToolsService(), []);
  return useQuery({
    queryKey: ["tools"],
    queryFn: () => toolsService.getAll(),
  });
}

export function useToolsCsv({ setOpen }: UseTools) {
  const queryClient = useQueryClient();
  const toolsService = useMemo(() => new ToolsService(), []);

  const mutation = useMutation({
    mutationFn: (data: File) => toolsService.postCSV(data),
    onError: () => {
      showErrorToast();
    },
    onSuccess: () => {
      showSuccessToast();
      queryClient.invalidateQueries({ queryKey: ["tools"] });
      if (setOpen) setOpen(false);
    },
  });

  const form = useForm<z.infer<typeof csvSchema>>({
    resolver: zodResolver(csvSchema),
    defaultValues: { csv: "" },
  });

  const onSubmit = (values: z.infer<typeof csvSchema>) => {
    mutation.mutate(values.csv);
  };

  return { form, onSubmit };
}

export function useTools({ setOpen }: UseTools) {
  const queryClient = useQueryClient();
  const toolsService = useMemo(() => new ToolsService(), []);

  const mutation = useMutation({
    mutationFn: (data: any) => toolsService.post(data),
    onError: () => {
      showErrorToast();
    },
    onSuccess: () => {
      showSuccessToast();
      queryClient.invalidateQueries({ queryKey: ["tools"] });
      if (setOpen) setOpen(false);
    },
  });

  const form = useForm<z.infer<typeof toolSchema>>({
    resolver: zodResolver(toolSchema),
    defaultValues: { status: Object.values(Status)[0] },
  });

  const onSubmit = (values: z.infer<typeof toolSchema>) => {
    console.log("onSubmit", values);
    mutation.mutate(values);
  };

  return { form, onSubmit };
}
