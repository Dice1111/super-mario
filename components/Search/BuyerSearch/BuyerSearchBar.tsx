import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import BuyerSearchSchema, { BuyerSearchSchemaType } from "./BuyerSearchSchema";

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
      <div className="w-full max-w-3xl mx-auto p-4">
        <form
          onSubmit={form.handleSubmit(handleSearch)}
          className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-lg"
        >
          {/* Search Input Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex items-center flex-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Search by title"
                    className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Search Button */}
          <Button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Search
          </Button>
        </form>

        {/* Error Message */}
        {form.formState.errors.title && (
          <FormMessage className="text-red-500 mt-2 text-sm">
            {form.formState.errors.title?.message}
          </FormMessage>
        )}
      </div>
    </FormProvider>
  );
};

export default BuyerSearchBar;
