import { db } from "@/lib/db";
import type { CreateTagInput, UpdateTagInput } from "@/lib/validators/tag.validators";

export const tagService = {
  async list(userId: string) {
    return db.tag.findMany({
      where: { userId },
      orderBy: { name: "asc" },
    });
  },

  async getById(userId: string, tagId: string) {
    return db.tag.findFirst({
      where: { id: tagId, userId },
    });
  },

  async create(userId: string, data: CreateTagInput) {
    return db.tag.create({
      data: {
        userId,
        name: data.name,
        color: data.color,
      },
    });
  },

  async update(userId: string, tagId: string, data: UpdateTagInput) {
    const tag = await db.tag.findFirst({
      where: { id: tagId, userId },
    });

    if (!tag) {
      return null;
    }

    return db.tag.update({
      where: { id: tagId },
      data,
    });
  },

  async delete(userId: string, tagId: string) {
    const tag = await db.tag.findFirst({
      where: { id: tagId, userId },
    });

    if (!tag) {
      return null;
    }

    return db.tag.delete({
      where: { id: tagId },
    });
  },
};
