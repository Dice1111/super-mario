import { z } from "zod";

const UsedCarListingFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }),
  agentEmail: z.string().email({
    message: "Invalid agent email address",
  }),
  sellerEmail: z.string().email({
    message: "Invalid seller email address",
  }),
  mileage: z.number().min(0, {
    message: "Mileage must be a positive number",
  }),
  color: z.string().min(3, {
    message: "Color must be at least 3 characters long",
  }),
  condition: z.string().min(3, {
    message: "Condition must be at least 3 characters long",
  }),
  imgUrl: z.string().min(3,{
    message: "Invalid image URL",
  }),
  manufacturedYear: z
    .number()
    .min(1886, { message: "Manufactured year must be a valid year" }) // Car manufacturing started around 1886
    .max(new Date().getFullYear(), {
      message: `Year cannot be in the future`,
    }),
  price: z.number().min(0, {
    message: "Price must be a positive number",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters long"
  })
});

export default UsedCarListingFormSchema;

export type UsedCarListingFormSchemaType = z.infer<typeof UsedCarListingFormSchema>;
