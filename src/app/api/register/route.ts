import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/validators/auth.validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);

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

    const { name, email, password } = validation.data;

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: {
            code: "USER_EXISTS",
            message: "Ein Konto mit dieser E-Mail existiert bereits",
          },
        },
        { status: 409 }
      );
    }

    // Hash password with bcrypt (12 rounds as per privacy rules)
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = await db.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    // Create default workspaces for the user
    await db.workspace.createMany({
      data: [
        {
          userId: user.id,
          name: "Uni",
          type: "UNI",
          privacyLevel: "NORMAL",
          color: "#6366f1",
        },
        {
          userId: user.id,
          name: "Geschäftlich",
          type: "BUSINESS",
          privacyLevel: "CONFIDENTIAL",
          color: "#f59e0b",
        },
      ],
    });

    return NextResponse.json({ data: user }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "Ein unerwarteter Fehler ist aufgetreten",
        },
      },
      { status: 500 }
    );
  }
}
