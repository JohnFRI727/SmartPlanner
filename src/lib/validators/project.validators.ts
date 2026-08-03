import { z } from "zod";

export const createProjectSchema = z.object({
  workspaceId: z.string().uuid("Ungültige Workspace-ID"),
  name: z.string().min(1, "Name ist erforderlich").max(200, "Name darf maximal 200 Zeichen haben"),
  description: z.string().max(5000, "Beschreibung darf maximal 5000 Zeichen haben").optional(),
  goal: z.string().max(2000, "Ziel darf maximal 2000 Zeichen haben").optional(),
  status: z.enum(["PLANNED", "ACTIVE", "WAITING", "COMPLETED", "ARCHIVED"]).default("PLANNED"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  deadline: z.string().datetime().optional(),
});

export const updateProjectSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich").max(200, "Name darf maximal 200 Zeichen haben").optional(),
  description: z.string().max(5000, "Beschreibung darf maximal 5000 Zeichen haben").optional().nullable(),
  goal: z.string().max(2000, "Ziel darf maximal 2000 Zeichen haben").optional().nullable(),
  status: z.enum(["PLANNED", "ACTIVE", "WAITING", "COMPLETED", "ARCHIVED"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  deadline: z.string().datetime().optional().nullable(),
});

export const projectListQuerySchema = z.object({
  workspaceId: z.string().uuid().optional(),
  status: z.enum(["PLANNED", "ACTIVE", "WAITING", "COMPLETED", "ARCHIVED"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectListQuery = z.infer<typeof projectListQuerySchema>;
