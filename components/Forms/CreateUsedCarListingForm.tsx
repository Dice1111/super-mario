import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import UsedCarListingFormSchema, {
  UsedCarListingFormSchemaType,
} from "./UsedCarListingFormSchema";

interface UsedCarListingFormProps {
  submitUsedCarListing: (values: UsedCarListingFormSchemaType) => Promise<void>;
}

const UsedCarListingForm = ({
  submitUsedCarListing,
}: UsedCarListingFormProps) => {
  const form = useForm({
    resolver: zodResolver(UsedCarListingFormSchema),
    defaultValues: {
      title: "",
      agentEmail: "",
      sellerEmail: "",
      mileage: 0,
      color: "",
      condition: "",
      imgUrl: "",
      manufacturedYear: new Date().getFullYear(),
      price: 0,
      description: "",
    },
  });

  return (
    <div className="w-[300px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitUsedCarListing)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agentEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent Email</FormLabel>
                <FormControl>
                  <Input placeholder="Agent Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sellerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seller Email</FormLabel>
                <FormControl>
                  <Input placeholder="Seller Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mileage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mileage</FormLabel>
                <FormControl>
                  <Input placeholder="Mileage" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input placeholder="Color" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Condition</FormLabel>
                <FormControl>
                  <Input placeholder="Condition" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Image URL" type="url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="manufacturedYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manufactured Year</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Manufactured Year"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Price" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default UsedCarListingForm;
