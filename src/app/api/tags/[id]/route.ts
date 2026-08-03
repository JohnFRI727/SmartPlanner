import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { tagService } from "@/lib/services/tag.service";
import { updateTagSchema } from "@/lib/validators/tag.validators";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "Authentication required" } },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const validation = updateTagSchema.safeParse(body);

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

    const tag = await tagService.update(session.user.id, id, validation.data);

    if (!tag) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Tag nicht gefunden" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: tag });
  } catch (error) {
    console.error("Tag update error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Ein unerwarteter Fehler ist aufgetreten" } },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "Authentication required" } },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const tag = await tagService.delete(session.user.id, id);

    if (!tag) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Tag nicht gefunden" } },
        { status: 404 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Tag delete error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Ein unerwarteter Fehler ist aufgetreten" } },
      { status: 500 }
    );
  }
}
