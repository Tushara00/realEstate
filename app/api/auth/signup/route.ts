import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/app/admin/db/index";
import { users, emailVerificationTokens } from "@/app/admin/db/schema";
import { signupSchema } from "@/lib/validations/auth";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { generateSessionToken } from "@/lib/auth/tokens";
import { sendEmailVerification } from "@/lib/mail/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;

    // 1. Check for existing user
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" }, { status: 409 });
    }

    // 2. Create the user
    const passwordHash = await hashPassword(password);
    const [newUser] = await db
      .insert(users)
      .values({ name, email, passwordHash })
      .returning();

    // 3. Prepare for session
    const userAgent = req.headers.get("user-agent") ?? undefined;
    const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;
    const rawToken = generateSessionToken();

    await db.insert(emailVerificationTokens).values({
      userId: newUser.id,
      tokenHash: rawToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    // 4. Attempt email, but handle failure gracefully
   

      await sendEmailVerification(email, rawToken);
   

    // 5. Final Step: Create session once and return one response
    await createSession(newUser.id, ipAddress, userAgent);

    return NextResponse.json(
      {
        message: "success",
        user: { id: newUser.id, email: newUser.email, role: newUser.role },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("SIGNUP_ERROR", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
