import { db } from "@/lib/db";
import type { CreateSubtaskInput, UpdateSubtaskInput } from "@/lib/validators/subtask.validators";

export const subtaskService = {
  async list(userId: string, taskId: string) {
    // Verify task ownership
    const task = await db.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) {
      return null;
    }

    return db.subtask.findMany({
      where: { taskId },
      orderBy: { position: "asc" },
    });
  },

  async create(userId: string, taskId: string, data: CreateSubtaskInput) {
    // Verify task ownership
    const task = await db.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) {
      return null;
    }

    // Get next position
    const lastSubtask = await db.subtask.findFirst({
      where: { taskId },
      orderBy: { position: "desc" },
      select: { position: true },
    });

    const position = (lastSubtask?.position ?? -1) + 1;

    return db.subtask.create({
      data: {
        taskId,
        title: data.title,
        deadline: data.deadline ? new Date(data.deadline) : undefined,
        notes: data.notes,
        position,
      },
    });
  },

  async update(userId: string, taskId: string, subtaskId: string, data: UpdateSubtaskInput) {
    // Verify task ownership
    const task = await db.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) {
      return null;
    }

    const subtask = await db.subtask.findFirst({
      where: { id: subtaskId, taskId },
    });

    if (!subtask) {
      return null;
    }

    const updateData: Record<string, unknown> = { ...data };

    if (data.deadline === null) {
      updateData.deadline = null;
    } else if (data.deadline) {
      updateData.deadline = new Date(data.deadline);
    } else {
      delete updateData.deadline;
    }

    return db.subtask.update({
      where: { id: subtaskId },
      data: updateData,
    });
  },

  async delete(userId: string, taskId: string, subtaskId: string) {
    // Verify task ownership
    const task = await db.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) {
      return null;
    }

    const subtask = await db.subtask.findFirst({
      where: { id: subtaskId, taskId },
    });

    if (!subtask) {
      return null;
    }

    return db.subtask.delete({
      where: { id: subtaskId },
    });
  },
};
