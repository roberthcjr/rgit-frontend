import { toast } from "sonner";
import { ArrowRightToLine, X } from "lucide-react";

export const showSuccessToast = (message?: string) =>
  toast(message ?? "Empréstimo realizada com sucesso", {
    icon: <ArrowRightToLine />,
  });

export const showErrorToast = (message?: string) =>
  toast(message ?? "Algo deu errado no empréstimo", { icon: <X /> });
