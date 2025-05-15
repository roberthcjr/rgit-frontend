import { toast } from "sonner";
import { UserRoundX } from "lucide-react";

export const showErrorToast = (message: string) =>
  toast(message, { icon: <UserRoundX /> });
