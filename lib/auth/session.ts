//import {db} from "@/app/admin/db/client";
import { db } from "@/app/admin/db/index";
import { eq, ilike, or,lte,and,gte } from "drizzle-orm";
import { generateSessionToken, hashToken } from "./tokens";
import { setSessionCookie, clearSessionCookie, getSessionCookie } from "./cookies";
import { SESSION_DURATION_SECONDS } from "@/lib/auth/constant";
import { sessions } from "@/app/admin/db/schema"; 

export async function createSession(userId: string, ipAddress?: string, userAgent?: string){
    const rawToken =generateSessionToken();
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + SESSION_DURATION_SECONDS * 1000);

   await db.insert(sessions).values({
  userId,
  sessionTokenHash: tokenHash,
  ipAddress: ipAddress || "",
  userAgent: userAgent || "",
  expiresAt,
});
      await setSessionCookie(rawToken);
}

export async function deleteCurrentSession(){
    const rawToken = await getSessionCookie();
    if(!rawToken){
        await clearSessionCookie();
        return;
    }
    const tokenHash = hashToken(rawToken);
   await db.delete(sessions)
    .where(eq(sessions.sessionTokenHash, tokenHash));
    await clearSessionCookie();
}

export async function getCurrentSession(){
    const rawToken = await getSessionCookie();
    if(!rawToken) return null;
    const tokenHash = hashToken(rawToken);
      const session = await db.query.sessions.findFirst({
    where: eq(sessions.sessionTokenHash, tokenHash),
    with: {
      user: true,
    },
  });

  if (!session) return null;
  if (session.expiresAt < new Date()) {
    await db.delete(sessions).where(eq(sessions.sessionTokenHash, tokenHash));
    await clearSessionCookie();
    return null;
  }
    await db
    .update(sessions)
    .set({ lastUsedAt: new Date() })
    .where(eq(sessions.sessionTokenHash, tokenHash));

  return session;
}