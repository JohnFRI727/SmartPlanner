import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { subtaskService } from "@/lib/services/subtask.service";
import { createSubtaskSchema } from "@/lib/validators/subtask.validators";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "Authentication required" } },
      { status: 401 }
    );
  }

  const { id: taskId } = await params;

  try {
    const subtasks = await subtaskService.list(session.user.id, taskId);

    if (subtasks === null) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Aufgabe nicht gefunden" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: subtasks });
  } catch (error) {
    console.error("Subtask list error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Ein unerwarteter Fehler ist aufgetreten" } },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "Authentication required" } },
      { status: 401 }
    );
  }

  const { id: taskId } = await params;

  try {
    const body = await request.json();
    const validation = createSubtaskSchema.safeParse(body);

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

    const subtask = await subtaskService.create(session.user.id, taskId, validation.data);

    if (!subtask) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Aufgabe nicht gefunden" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: subtask }, { status: 201 });
  } catch (error) {
    console.error("Subtask create error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Ein unerwarteter Fehler ist aufgetreten" } },
      { status: 500 }
    );
  }
}
