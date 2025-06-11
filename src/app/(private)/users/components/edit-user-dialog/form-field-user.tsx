import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { UserType, type ExtendedUserType } from "../../types/user-type";

type InsertUserFormFieldProps = {
  formControl: Control<Omit<ExtendedUserType, "id">>;
  fieldName: keyof UserType;
  label: string;
};

export default function InsertUserFormField({
  formControl,
  fieldName,
  label,
}: InsertUserFormFieldProps) {
  return (
    <FormField
      control={formControl}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={`Edite a ${label.toLowerCase()}...`}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
