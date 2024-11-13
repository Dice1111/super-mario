import { z } from "zod";

const BuyerSearchSchema = z.object({
  title: z.string(),
});

export default BuyerSearchSchema;
export type BuyerSearchSchemaType = z.infer<typeof BuyerSearchSchema>;
