import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm, FormProvider } from "react-hook-form";
import BuyerSearchSchema, { BuyerSearchSchemaType } from "./BuyerSearchSchema";
import { UsedCarListing } from "@prisma/client";

interface SearchBarProps {
  handleSearch: (values: BuyerSearchSchemaType) => Promise<void>;
}

const BuyerSearchBar = ({ handleSearch }: SearchBarProps) => {
  const form = useForm<BuyerSearchSchemaType>({
    resolver: zodResolver(BuyerSearchSchema),
    defaultValues: {
      title: "",
    },
  });

  return (
    <FormProvider {...form}>
      <div className="flex items-center space-x-4 w-full">
        <form
          onSubmit={form.handleSubmit(handleSearch)}
          className="flex flex-row items-center space-x-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Search by title"
                    className="w-[180px] border border-gray-300 rounded-md p-2"
                  />
                </FormControl>
                {/* Error message display */}
                {form.formState.errors.title && (
                  <FormMessage className="text-red-500">
                    {form.formState.errors.title?.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
    </FormProvider>
  );
};

export default BuyerSearchBar;
