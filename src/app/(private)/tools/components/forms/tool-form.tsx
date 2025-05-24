import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { statusSelectOptions } from "../../model";


interface ToolFormProps {
    form: any;
    onSubmit: (values: any) => void;
}

export function ToolForm({form, onSubmit}: ToolFormProps) {
    return (
        <Form {...form} className="w-full">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4 w-96"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormDescription>Nome da ferramenta</FormDescription>
                <FormControl>
                  <Input className="p-2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormDescription>Status da ferramenta</FormDescription>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statusSelectOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand.name"
            render={({ field }) => (
              <FormItem>
                <FormDescription>Marca</FormDescription>
                <FormControl>
                  <Input className="p-2" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category.name"
            render={({ field }) => (
              <FormItem>
                <FormDescription>Categoria da ferramenta</FormDescription>
                <FormControl>
                  <Input {...field} className="p-2" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Inserir</Button>
        </form>
      </Form>
    );
}