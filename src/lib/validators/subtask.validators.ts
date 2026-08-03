import { z } from "zod";

export const createSubtaskSchema = z.object({
  title: z.string().min(1, "Titel ist erforderlich").max(200, "Titel darf maximal 200 Zeichen haben"),
  deadline: z.string().datetime().optional(),
  notes: z.string().max(2000, "Notizen dürfen maximal 2000 Zeichen haben").optional(),
});

export const updateSubtaskSchema = z.object({
  title: z.string().min(1, "Titel ist erforderlich").max(200, "Titel darf maximal 200 Zeichen haben").optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "DONE"]).optional(),
  deadline: z.string().datetime().optional().nullable(),
  notes: z.string().max(2000, "Notizen dürfen maximal 2000 Zeichen haben").optional().nullable(),
  position: z.number().int().min(0).optional(),
});

export type CreateSubtaskInput = z.infer<typeof createSubtaskSchema>;
export type UpdateSubtaskInput = z.infer<typeof updateSubtaskSchema>;
