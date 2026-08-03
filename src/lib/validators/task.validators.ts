import { z } from "zod";

export const createTaskSchema = z.object({
  projectId: z.string().uuid("Ungültige Projekt-ID"),
  title: z.string().min(1, "Titel ist erforderlich").max(200, "Titel darf maximal 200 Zeichen haben"),
  description: z.string().max(5000, "Beschreibung darf maximal 5000 Zeichen haben").optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "WAITING", "DONE"]).default("OPEN"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  deadline: z.string().datetime().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, "Titel ist erforderlich").max(200, "Titel darf maximal 200 Zeichen haben").optional(),
  description: z.string().max(5000, "Beschreibung darf maximal 5000 Zeichen haben").optional().nullable(),
  status: z.enum(["OPEN", "IN_PROGRESS", "WAITING", "DONE"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  deadline: z.string().datetime().optional().nullable(),
  position: z.number().int().min(0).optional(),
});

export const taskListQuerySchema = z.object({
  projectId: z.string().uuid().optional(),
  workspaceId: z.string().uuid().optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "WAITING", "DONE"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  sortBy: z.enum(["deadline", "priority", "createdAt", "position"]).default("position"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type TaskListQuery = z.infer<typeof taskListQuerySchema>;
