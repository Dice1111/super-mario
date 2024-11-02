import { z } from "zod";

const AgentSearchSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

export default AgentSearchSchema;
export type AgentSearchSchemaType = z.infer<typeof AgentSearchSchema>;
