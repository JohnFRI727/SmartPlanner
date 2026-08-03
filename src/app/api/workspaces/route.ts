import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { workspaceService } from "@/lib/services/workspace.service";
import { createWorkspaceSchema } from "@/lib/validators/workspace.validators";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "Authentication required" } },
      { status: 401 }
    );
  }

  try {
    const workspaces = await workspaceService.list(session.user.id);
    return NextResponse.json({ data: workspaces });
  } catch (error) {
    console.error("Workspace list error:", error);
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
    const validation = createWorkspaceSchema.safeParse(body);

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

    const workspace = await workspaceService.create(session.user.id, validation.data);
    return NextResponse.json({ data: workspace }, { status: 201 });
  } catch (error) {
    console.error("Workspace create error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Ein unerwarteter Fehler ist aufgetreten" } },
      { status: 500 }
    );
  }
}
