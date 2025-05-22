import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { State } from "../../types/action.type";
import { UserType } from "../../types/user-type";

type InsertUserFormFieldProps = {
  formControl: Control<UserType>;
  fieldName: keyof UserType;
  label: string;
  state: State;
};

export default function InsertUserFormField({
  formControl,
  fieldName,
  label,
  state,
}: InsertUserFormFieldProps) {
  return (
    <FormField
      control={formControl}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={fieldName} {...field} />
          </FormControl>

          {state?.errors?.[fieldName] && (
            <>
              <FormDescription>{state.errors[fieldName]}</FormDescription>
              <FormMessage />
            </>
          )}
        </FormItem>
      )}
    />
  );
}
