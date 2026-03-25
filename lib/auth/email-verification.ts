import { db } from "@/app/admin/db/index"; // your Drizzle DB
import { emailVerificationTokens, users } from "@/app/admin/db/schema";
import { and, eq, gt } from "drizzle-orm";
import { hashToken } from "./tokens";

type VerifyEmailResult = {
  success: boolean;
  message: string;
};

export async function verifyEmailToken(rawToken: string): Promise<VerifyEmailResult> {
  try {
    // Hash token from URL
    const tokenHash = hashToken(rawToken);

    // Find token in DB that has not expired
    const [tokenRow] = await db
      .select()
      .from(emailVerificationTokens)
      .where(
        and(
          eq(emailVerificationTokens.tokenHash, tokenHash),
          gt(emailVerificationTokens.expiresAt, new Date()) // expiresAt > now
        )
      )
      .limit(1);

    if (!tokenRow) {
      return {
        success: false,
        message: "Invalid or expired verification link.",
      };
    }

    // Update user's emailVerified to true
    await db
      .update(users)
      .set({
        emailVerified: true,
      })
      .where(eq(users.id, tokenRow.userId));

    // Delete the used token from DB
    await db
      .delete(emailVerificationTokens)
      .where(eq(emailVerificationTokens.id, tokenRow.id));

    return {
      success: true,
      message: "Email verified successfully.",
    };
  } catch (error) {
    console.error("VERIFY_EMAIL_ERROR", error);

    return {
      success: false,
      message: "Something went wrong while verifying email.",
    };
  }
}