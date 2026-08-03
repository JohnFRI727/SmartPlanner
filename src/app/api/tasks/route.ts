import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { taskService } from "@/lib/services/task.service";
import { createTaskSchema, taskListQuerySchema } from "@/lib/validators/task.validators";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "Authentication required" } },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      projectId: searchParams.get("projectId") || undefined,
      workspaceId: searchParams.get("workspaceId") || undefined,
      status: searchParams.get("status") || undefined,
      priority: searchParams.get("priority") || undefined,
      sortBy: searchParams.get("sortBy") || undefined,
      sortOrder: searchParams.get("sortOrder") || undefined,
      page: searchParams.get("page") || undefined,
      pageSize: searchParams.get("pageSize") || undefined,
    };

    const validation = taskListQuerySchema.safeParse(queryParams);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Ungültige Abfrageparameter",
            details: validation.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const result = await taskService.list(session.user.id, validation.data);
    return NextResponse.json({ data: result.tasks, pagination: result.pagination });
  } catch (error) {
    console.error("Task list error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Ein unerwarteter Fehler ist aufgetreten" } },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "Authentication required" } },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const validation = createTaskSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Ungültige Eingabe",
            details: validation.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const task = await taskService.create(session.user.id, validation.data);

    if (!task) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Projekt nicht gefunden" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: task }, { status: 201 });
  } catch (error) {
    console.error("Task create error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Ein unerwarteter Fehler ist aufgetreten" } },
      { status: 500 }
    );
  }
}
