import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { subtaskService } from "@/lib/services/subtask.service";
import { updateSubtaskSchema } from "@/lib/validators/subtask.validators";

interface RouteParams {
  params: Promise<{ id: string; subtaskId: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "Authentication required" } },
      { status: 401 }
    );
  }

  const { id: taskId, subtaskId } = await params;

  try {
    const body = await request.json();
    const validation = updateSubtaskSchema.safeParse(body);

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

    const subtask = await subtaskService.update(session.user.id, taskId, subtaskId, validation.data);

    if (!subtask) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Unteraufgabe nicht gefunden" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: subtask });
  } catch (error) {
    console.error("Subtask update error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Ein unerwarteter Fehler ist aufgetreten" } },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "Authentication required" } },
      { status: 401 }
    );
  }

  const { id: taskId, subtaskId } = await params;

  try {
    const subtask = await subtaskService.delete(session.user.id, taskId, subtaskId);

    if (!subtask) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Unteraufgabe nicht gefunden" } },
        { status: 404 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Subtask delete error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Ein unerwarteter Fehler ist aufgetreten" } },
      { status: 500 }
    );
  }
}
