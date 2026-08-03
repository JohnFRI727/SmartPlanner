import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Create test user
  const passwordHash = await bcrypt.hash("Test1234!", 12);
  const user = await prisma.user.upsert({
    where: { email: "test@smartplanner.dev" },
    update: {},
    create: {
      email: "test@smartplanner.dev",
      name: "Test Nutzer",
      passwordHash,
    },
  });

  console.log(`  ✓ User created: ${user.email}`);

  // Create workspaces
  const uniWorkspace = await prisma.workspace.upsert({
    where: { id: "seed-ws-uni" },
    update: {},
    create: {
      id: "seed-ws-uni",
      userId: user.id,
      name: "Uni",
      type: "UNI",
      privacyLevel: "NORMAL",
      color: "#6366f1",
    },
  });

  const businessWorkspace = await prisma.workspace.upsert({
    where: { id: "seed-ws-business" },
    update: {},
    create: {
      id: "seed-ws-business",
      userId: user.id,
      name: "Geschäftlich",
      type: "BUSINESS",
      privacyLevel: "CONFIDENTIAL",
      color: "#f59e0b",
    },
  });

  console.log(
    `  ✓ Workspaces created: ${uniWorkspace.name}, ${businessWorkspace.name}`
  );

  // Create sample projects
  const uniProject = await prisma.project.upsert({
    where: { id: "seed-proj-thesis" },
    update: {},
    create: {
      id: "seed-proj-thesis",
      userId: user.id,
      workspaceId: uniWorkspace.id,
      name: "Bachelorarbeit",
      description: "Bachelorarbeit im Bereich KI-gestützte Planung",
      goal: "Fertigstellung bis Ende des Semesters",
      status: "ACTIVE",
      priority: "HIGH",
      deadline: new Date("2027-03-31"),
    },
  });

  const businessProject = await prisma.project.upsert({
    where: { id: "seed-proj-client" },
    update: {},
    create: {
      id: "seed-proj-client",
      userId: user.id,
      workspaceId: businessWorkspace.id,
      name: "Kundenprojekt WebApp",
      description: "Frontend-Entwicklung für Kunden-Dashboard",
      goal: "MVP bis Ende Q1 liefern",
      status: "ACTIVE",
      priority: "HIGH",
      deadline: new Date("2027-01-31"),
    },
  });

  console.log(
    `  ✓ Projects created: ${uniProject.name}, ${businessProject.name}`
  );

  // Create sample tasks
  const tasks = await Promise.all([
    prisma.task.upsert({
      where: { id: "seed-task-1" },
      update: {},
      create: {
        id: "seed-task-1",
        projectId: uniProject.id,
        userId: user.id,
        title: "Literaturrecherche abschließen",
        description: "Alle relevanten Papers sammeln und zusammenfassen",
        status: "IN_PROGRESS",
        priority: "HIGH",
        deadline: new Date("2026-09-15"),
        position: 0,
      },
    }),
    prisma.task.upsert({
      where: { id: "seed-task-2" },
      update: {},
      create: {
        id: "seed-task-2",
        projectId: uniProject.id,
        userId: user.id,
        title: "Kapitel 1 schreiben",
        description: "Einleitung und Motivation",
        status: "OPEN",
        priority: "MEDIUM",
        deadline: new Date("2026-10-01"),
        position: 1,
      },
    }),
    prisma.task.upsert({
      where: { id: "seed-task-3" },
      update: {},
      create: {
        id: "seed-task-3",
        projectId: businessProject.id,
        userId: user.id,
        title: "Design-Review mit Kunde",
        description: "Figma-Prototyp präsentieren und Feedback einholen",
        status: "OPEN",
        priority: "URGENT",
        deadline: new Date("2026-08-10"),
        position: 0,
      },
    }),
  ]);

  console.log(`  ✓ Tasks created: ${tasks.length}`);

  // Create sample subtasks
  await prisma.subtask.upsert({
    where: { id: "seed-subtask-1" },
    update: {},
    create: {
      id: "seed-subtask-1",
      taskId: tasks[0].id,
      title: "Google Scholar Suche",
      status: "DONE",
      position: 0,
    },
  });

  await prisma.subtask.upsert({
    where: { id: "seed-subtask-2" },
    update: {},
    create: {
      id: "seed-subtask-2",
      taskId: tasks[0].id,
      title: "Papers lesen und annotieren",
      status: "IN_PROGRESS",
      position: 1,
    },
  });

  await prisma.subtask.upsert({
    where: { id: "seed-subtask-3" },
    update: {},
    create: {
      id: "seed-subtask-3",
      taskId: tasks[0].id,
      title: "Zusammenfassung schreiben",
      status: "OPEN",
      position: 2,
    },
  });

  console.log("  ✓ Subtasks created");

  // Create tags
  await prisma.tag.upsert({
    where: { id: "seed-tag-1" },
    update: {},
    create: {
      id: "seed-tag-1",
      userId: user.id,
      name: "dringend",
      color: "#ef4444",
    },
  });

  await prisma.tag.upsert({
    where: { id: "seed-tag-2" },
    update: {},
    create: {
      id: "seed-tag-2",
      userId: user.id,
      name: "recherche",
      color: "#3b82f6",
    },
  });

  await prisma.tag.upsert({
    where: { id: "seed-tag-3" },
    update: {},
    create: {
      id: "seed-tag-3",
      userId: user.id,
      name: "meeting",
      color: "#10b981",
    },
  });

  console.log("  ✓ Tags created");

  console.log("\n✅ Seed completed successfully!");
  console.log("   Login: test@smartplanner.dev / Test1234!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
