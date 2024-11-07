import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form"; // Import necessary components
import AgentSearchSchema, { AgentSearchSchemaType } from "./AgentSearchSchema";

interface SearchBarProps {
  handleSearch: (values: AgentSearchSchemaType) => Promise<void>;
}

const AgentSearchBar = ({ handleSearch }: SearchBarProps) => {
  const form = useForm<AgentSearchSchemaType>({
    resolver: zodResolver(AgentSearchSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: AgentSearchSchemaType) => {
    await handleSearch(data);
  };

  return (
    <FormProvider {...form}>
      <div className="flex items-center space-x-4 w-full">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-row items-center space-x-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Input {...field} placeholder="title" className="w-[180px]" />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.title?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <Button type="submit">Search</Button>
        </form>
      </div>
    </FormProvider>
  );
};

export default AgentSearchBar;
