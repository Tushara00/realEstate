import { requireAdmin } from "@/lib/auth/guards";
import LogoutButton from "@/app/components/logout-button";

export default async function DashbaordPage(){
    const user = await requireAdmin();
    return(
        <div className="max-w-2xl mx-auto mt-20 space-y-4">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p>Welcome Admin,{user.name ?? "Admin"}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <LogoutButton />
      </div>
    )
}