import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useMemo } from "react";
import ToolsService from "../service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { csvSchema } from "../validators/csvInputValidator";
import { toolFormSchema } from "../validators/toolInputValidator";
import { toolSchema } from "../helpers/toolInputHelper";
import { Status } from "../model";
import { z } from "zod";
import { showErrorToast, showSuccessToast } from "../components/toaster";

type UseTools = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined) return;

    if (typeof value === "object" && value !== null) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
}

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
    mutationFn: (data: any) => toolsService.post(JSON.stringify(data)),
    onError: () => {
      showErrorToast();
    },
    onSuccess: () => {
      showSuccessToast();
      queryClient.invalidateQueries({ queryKey: ["tools"] });
      if (setOpen) setOpen(false);
    },
  });

  const form = useForm<z.infer<typeof toolFormSchema>>({
    resolver: zodResolver(toolFormSchema),
    defaultValues: { status: Object.keys(Status)[0] as keyof typeof Status },
  });

  const onSubmit = (values: z.infer<typeof toolFormSchema>) => {
    console.log(values);
    const processedData = toolSchema.parse(values);
    console.log("processedData", processedData);
    mutation.mutate(processedData);
  };

  return { form, onSubmit };
}
