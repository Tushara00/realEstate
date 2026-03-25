import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/app/admin/db/index";
import { users,emailVerificationTokens  } from "@/app/admin/db/schema";
import { signupSchema } from "@/lib/validations/auth";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { generateSessionToken } from "@/lib/auth/tokens";

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

    // Check if user already exists
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Insert new user
    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        passwordHash,
      })
      .returning();

    const userAgent = req.headers.get("user-agent") ?? undefined;

    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;
// email verivication token
const tokenHash = generateSessionToken();
 await db.insert(emailVerificationTokens).values({
    userId: newUser.id,                   // <-- actual UUID string
    tokenHash: tokenHash,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h expiry
  });
    // 4️⃣ Send email
  await sendEmailVerification(email, token);
    // Create session
    await createSession(newUser.id, ipAddress, userAgent);

    return NextResponse.json(
      {
        message: "Signup successful check you email",
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("SIGNUP_ERROR", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}