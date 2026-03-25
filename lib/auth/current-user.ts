import { getCurrentSession } from "./session";

export async function getCurrentUser(){
    const session = await getCurrentSession();
    return session?.user ?? null;
}