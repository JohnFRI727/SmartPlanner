import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { workspaceService } from "@/lib/services/workspace.service";
import { updateWorkspaceSchema } from "@/lib/validators/workspace.validators";

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

  const { id } = await params;

  try {
    const workspace = await workspaceService.getById(session.user.id, id);

    if (!workspace) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Workspace nicht gefunden" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: workspace });
  } catch (error) {
    console.error("Workspace get error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Ein unerwarteter Fehler ist aufgetreten" } },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "Authentication required" } },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const validation = updateWorkspaceSchema.safeParse(body);

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

    const workspace = await workspaceService.update(session.user.id, id, validation.data);

    if (!workspace) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Workspace nicht gefunden" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: workspace });
  } catch (error) {
    console.error("Workspace update error:", error);
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

  const { id } = await params;

  try {
    const workspace = await workspaceService.delete(session.user.id, id);

    if (!workspace) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Workspace nicht gefunden" } },
        { status: 404 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Workspace delete error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Ein unerwarteter Fehler ist aufgetreten" } },
      { status: 500 }
    );
  }
}
