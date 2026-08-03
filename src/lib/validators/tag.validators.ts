import { z } from "zod";

export const createTagSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich").max(50, "Name darf maximal 50 Zeichen haben"),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Ungültiger Farbcode").default("#6366f1"),
});

export const updateTagSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich").max(50, "Name darf maximal 50 Zeichen haben").optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Ungültiger Farbcode").optional(),
});

export type CreateTagInput = z.infer<typeof createTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
