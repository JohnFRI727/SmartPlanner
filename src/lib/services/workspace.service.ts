import { db } from "@/lib/db";
import type { CreateWorkspaceInput, UpdateWorkspaceInput } from "@/lib/validators/workspace.validators";

export const workspaceService = {
  async list(userId: string) {
    return db.workspace.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });
  },

  async getById(userId: string, workspaceId: string) {
    return db.workspace.findFirst({
      where: { id: workspaceId, userId },
    });
  },

  async create(userId: string, data: CreateWorkspaceInput) {
    return db.workspace.create({
      data: {
        userId,
        name: data.name,
        type: data.type,
        privacyLevel: data.privacyLevel,
        color: data.color,
      },
    });
  },

  async update(userId: string, workspaceId: string, data: UpdateWorkspaceInput) {
    // Verify ownership
    const workspace = await db.workspace.findFirst({
      where: { id: workspaceId, userId },
    });

    if (!workspace) {
      return null;
    }

    return db.workspace.update({
      where: { id: workspaceId },
      data,
    });
  },

  async delete(userId: string, workspaceId: string) {
    // Verify ownership
    const workspace = await db.workspace.findFirst({
      where: { id: workspaceId, userId },
    });

    if (!workspace) {
      return null;
    }

    return db.workspace.delete({
      where: { id: workspaceId },
    });
  },
};
