import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserProfile } from "@prisma/client";
import { useForm, FormProvider } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form"; // Import necessary components
import AdminSearchSchema, { AdminSearchSchemaType } from "./AdminSearchSchema";

interface SearchBarProps {
  handleSearch: (values: AdminSearchSchemaType) => Promise<void>;
}

const AdminSearchBar = ({ handleSearch }: SearchBarProps) => {
  const form = useForm<AdminSearchSchemaType>({
    resolver: zodResolver(AdminSearchSchema),
    defaultValues: {
      searchType: "",
      email: "",
    },
  });

  const onSubmit = async (data: AdminSearchSchemaType) => {
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
            name="searchType"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Search Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Search For</SelectLabel>
                        <SelectItem value="account">User Account</SelectItem>
                        <SelectItem value="profile">User Profile</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>
                  {form.formState.errors.searchType?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Email"
                    className="w-[180px]"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
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

export default AdminSearchBar;
