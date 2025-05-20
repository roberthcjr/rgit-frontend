import { toast } from "sonner";
import { PackageCheck, PackageX } from "lucide-react";

export const showSuccessToast = () =>
  toast("Importação realizada com sucesso", { icon: <PackageCheck /> });

export const showErrorToast = () =>
  toast("Algo deu errado na importação", { icon: <PackageX /> });
