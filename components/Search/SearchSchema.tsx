import { z } from "zod";

const searchSchema = z.object({
  searchType: z.string().min(2, { message: "Search type is required" }),
  email: z.string().email().min(2, { message: "Email is required" }),
});

export default searchSchema;
export type searchSchemaType = z.infer<typeof searchSchema>;
