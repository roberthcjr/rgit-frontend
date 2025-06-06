import { toast } from "sonner";
import { PackageCheck, PackageX } from "lucide-react";

export const showSuccessToast = (message?: string) =>
  toast(message ?? "Importação realizada com sucesso", {
    icon: <PackageCheck />,
  });

export const showErrorToast = (message?: string) =>
  toast(message ?? "Algo deu errado na importação", { icon: <PackageX /> });
