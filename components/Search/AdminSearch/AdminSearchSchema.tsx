import { z } from "zod";

const AdminSearchSchema = z.object({
  searchType: z.string().min(2, { message: "Search type is required" }),
  email: z.string().email().min(2, { message: "Email is required" }),
});

export default AdminSearchSchema;
export type AdminSearchSchemaType = z.infer<typeof AdminSearchSchema>;
