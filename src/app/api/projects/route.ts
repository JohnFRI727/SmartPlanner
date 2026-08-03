import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { projectService } from "@/lib/services/project.service";
import { createProjectSchema, projectListQuerySchema } from "@/lib/validators/project.validators";

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
      workspaceId: searchParams.get("workspaceId") || undefined,
      status: searchParams.get("status") || undefined,
      priority: searchParams.get("priority") || undefined,
      page: searchParams.get("page") || undefined,
      pageSize: searchParams.get("pageSize") || undefined,
    };

    const validation = projectListQuerySchema.safeParse(queryParams);
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

    const result = await projectService.list(session.user.id, validation.data);
    return NextResponse.json({ data: result.projects, pagination: result.pagination });
  } catch (error) {
    console.error("Project list error:", error);
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
    const validation = createProjectSchema.safeParse(body);

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

    const project = await projectService.create(session.user.id, validation.data);

    if (!project) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Workspace nicht gefunden" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: project }, { status: 201 });
  } catch (error) {
    console.error("Project create error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Ein unerwarteter Fehler ist aufgetreten" } },
      { status: 500 }
    );
  }
}
