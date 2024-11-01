import { Role } from "@prisma/client";
import { z } from "zod";

const UserProfileFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  userEmail: z.string().email({ message: "Invalid email" }),
  role: z.enum([Role.admin, Role.agent, Role.buyer, Role.seller], {
    errorMap: () => ({ message: "Role is required" }),
  }),
  address: z.string().min(1, { message: "Address is required" }),
  mobileNumber: z.string().min(1, { message: "Mobile number is required" }),
});

export default UserProfileFormSchema;
export type UserProfileFormSchemaType = z.infer<typeof UserProfileFormSchema>;
