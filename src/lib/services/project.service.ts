import { db } from "@/lib/db";
import type { CreateProjectInput, UpdateProjectInput, ProjectListQuery } from "@/lib/validators/project.validators";

export const projectService = {
  async list(userId: string, query: ProjectListQuery) {
    const { workspaceId, status, priority, page, pageSize } = query;

    const where = {
      userId,
      ...(workspaceId && { workspaceId }),
      ...(status && { status }),
      ...(priority && { priority }),
      archivedAt: null,
    };

    const [projects, total] = await Promise.all([
      db.project.findMany({
        where,
        include: {
          workspace: { select: { id: true, name: true, color: true } },
          _count: { select: { tasks: true } },
        },
        orderBy: { updatedAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.project.count({ where }),
    ]);

    return {
      projects,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  },

  async getById(userId: string, projectId: string) {
    return db.project.findFirst({
      where: { id: projectId, userId },
      include: {
        workspace: { select: { id: true, name: true, color: true } },
        tasks: {
          orderBy: { position: "asc" },
          include: {
            _count: { select: { subtasks: true } },
          },
        },
        tags: true,
      },
    });
  },

  async create(userId: string, data: CreateProjectInput) {
    // Verify workspace ownership
    const workspace = await db.workspace.findFirst({
      where: { id: data.workspaceId, userId },
    });

    if (!workspace) {
      return null;
    }

    return db.project.create({
      data: {
        userId,
        workspaceId: data.workspaceId,
        name: data.name,
        description: data.description,
        goal: data.goal,
        status: data.status,
        priority: data.priority,
        deadline: data.deadline ? new Date(data.deadline) : undefined,
      },
      include: {
        workspace: { select: { id: true, name: true, color: true } },
      },
    });
  },

  async update(userId: string, projectId: string, data: UpdateProjectInput) {
    // Verify ownership
    const project = await db.project.findFirst({
      where: { id: projectId, userId },
    });

    if (!project) {
      return null;
    }

    return db.project.update({
      where: { id: projectId },
      data: {
        ...data,
        deadline: data.deadline === null ? null : data.deadline ? new Date(data.deadline) : undefined,
      },
      include: {
        workspace: { select: { id: true, name: true, color: true } },
      },
    });
  },

  async archive(userId: string, projectId: string) {
    const project = await db.project.findFirst({
      where: { id: projectId, userId },
    });

    if (!project) {
      return null;
    }

    return db.project.update({
      where: { id: projectId },
      data: {
        status: "ARCHIVED",
        archivedAt: new Date(),
      },
    });
  },

  async delete(userId: string, projectId: string) {
    const project = await db.project.findFirst({
      where: { id: projectId, userId },
    });

    if (!project) {
      return null;
    }

    return db.project.delete({
      where: { id: projectId },
    });
  },
};
