import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "session";
export const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

export async function setSessionCookie(token:string){
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME,token,{
        httpOnly:true, 
        secure:process.env.NODE_ENV === "production",
     maxAge: SESSION_DURATION_SECONDS,

    })
}
 export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
export async function getSessionCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}