import { toast } from "sonner";
import { UserCheck, UserX } from "lucide-react";

export const showSuccessToast = (message?: string) =>
  toast(message ?? "Inserção realizada com sucesso", { icon: <UserCheck /> });

export const showErrorToast = (message?: string) =>
  toast(message ?? "Algo deu errado na inserção", { icon: <UserX /> });
