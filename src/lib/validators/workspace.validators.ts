import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich").max(100, "Name darf maximal 100 Zeichen haben"),
  type: z.enum(["UNI", "BUSINESS", "CUSTOM"]).default("CUSTOM"),
  privacyLevel: z.enum(["NORMAL", "CONFIDENTIAL"]).default("NORMAL"),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Ungültiger Farbcode").default("#6366f1"),
});

export const updateWorkspaceSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich").max(100, "Name darf maximal 100 Zeichen haben").optional(),
  privacyLevel: z.enum(["NORMAL", "CONFIDENTIAL"]).optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Ungültiger Farbcode").optional(),
});

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>;
