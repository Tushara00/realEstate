import { NextResponse } from "next/server";
import { db } from "@/app/admin/db/index";
import { users } from "@/app/admin/db/schema";
import { eq } from "drizzle-orm";
import { loginSchema } from "@/lib/validations/auth";
import { VerifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const validPassword = await VerifyPassword(password, user.passwordHash!);

    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const userAgent = req.headers.get("user-agent") ?? undefined;
    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;

    await createSession(user.id, ipAddress, userAgent);

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("LOGIN_ERROR", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}