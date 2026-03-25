import { redirect } from "next/navigation";
import { getCurrentSession } from "./session";
export async function requireUser(){
const session = await getCurrentSession();

if(!session){
    redirect("/login");
}
return session.user
}
export async function requireAdmin(){
const session = await getCurrentSession();

if(!session){
    redirect("/login");
}
if(session.user.role !== "ADMIN"){
    redirect("/")
}
return session.user
}
