import { db } from "@/lib/db";
import type { CreateTaskInput, UpdateTaskInput, TaskListQuery } from "@/lib/validators/task.validators";

export const taskService = {
  async list(userId: string, query: TaskListQuery) {
    const { projectId, workspaceId, status, priority, sortBy, sortOrder, page, pageSize } = query;

    const where = {
      userId,
      ...(projectId && { projectId }),
      ...(workspaceId && { project: { workspaceId } }),
      ...(status && { status }),
      ...(priority && { priority }),
    };

    const [tasks, total] = await Promise.all([
      db.task.findMany({
        where,
        include: {
          project: { select: { id: true, name: true, workspaceId: true } },
          _count: { select: { subtasks: true } },
          subtasks: { select: { status: true } },
          tags: true,
        },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.task.count({ where }),
    ]);

    return {
      tasks,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  },

  async getById(userId: string, taskId: string) {
    return db.task.findFirst({
      where: { id: taskId, userId },
      include: {
        project: { select: { id: true, name: true, workspaceId: true } },
        subtasks: { orderBy: { position: "asc" } },
        tags: true,
        reminders: { orderBy: { remindAt: "asc" } },
      },
    });
  },

  async create(userId: string, data: CreateTaskInput) {
    // Verify project ownership
    const project = await db.project.findFirst({
      where: { id: data.projectId, userId },
    });

    if (!project) {
      return null;
    }

    // Get the next position
    const lastTask = await db.task.findFirst({
      where: { projectId: data.projectId },
      orderBy: { position: "desc" },
      select: { position: true },
    });

    const position = (lastTask?.position ?? -1) + 1;

    return db.task.create({
      data: {
        userId,
        projectId: data.projectId,
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        deadline: data.deadline ? new Date(data.deadline) : undefined,
        position,
      },
      include: {
        project: { select: { id: true, name: true, workspaceId: true } },
        subtasks: true,
        tags: true,
      },
    });
  },

  async update(userId: string, taskId: string, data: UpdateTaskInput) {
    const task = await db.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) {
      return null;
    }

    const updateData: Record<string, unknown> = { ...data };

    // Handle deadline
    if (data.deadline === null) {
      updateData.deadline = null;
    } else if (data.deadline) {
      updateData.deadline = new Date(data.deadline);
    } else {
      delete updateData.deadline;
    }

    // Handle status change to DONE
    if (data.status === "DONE" && task.status !== "DONE") {
      updateData.completedAt = new Date();
    } else if (data.status && data.status !== "DONE") {
      updateData.completedAt = null;
    }

    return db.task.update({
      where: { id: taskId },
      data: updateData,
      include: {
        project: { select: { id: true, name: true, workspaceId: true } },
        subtasks: true,
        tags: true,
      },
    });
  },

  async updateStatus(userId: string, taskId: string, status: "OPEN" | "IN_PROGRESS" | "WAITING" | "DONE") {
    return this.update(userId, taskId, { status });
  },

  async delete(userId: string, taskId: string) {
    const task = await db.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) {
      return null;
    }

    return db.task.delete({
      where: { id: taskId },
    });
  },

  async getUpcoming(userId: string, days: number = 7) {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + days);

    return db.task.findMany({
      where: {
        userId,
        status: { not: "DONE" },
        deadline: {
          gte: now,
          lte: futureDate,
        },
      },
      include: {
        project: { select: { id: true, name: true, workspaceId: true } },
        _count: { select: { subtasks: true } },
      },
      orderBy: { deadline: "asc" },
    });
  },

  async getOverdue(userId: string) {
    return db.task.findMany({
      where: {
        userId,
        status: { not: "DONE" },
        deadline: { lt: new Date() },
      },
      include: {
        project: { select: { id: true, name: true, workspaceId: true } },
        _count: { select: { subtasks: true } },
      },
      orderBy: { deadline: "asc" },
    });
  },
};
