import { z } from "zod";

const BuyerSearchSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

export default BuyerSearchSchema;
export type BuyerSearchSchemaType = z.infer<typeof BuyerSearchSchema>;
