import { verifyEmailToken } from "@/lib/auth/email-verification";
import { redirect } from "next/navigation";

type VerifyEmailPageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const { token } = await searchParams;

  if (!token) {
    return <div>Missing verification token.</div>;
  }

  const result = await verifyEmailToken(token);

  if (result.success) {
    redirect("/login?verified=1");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Email Verification</h1>
      <p className="mt-2 text-red-600">{result.message}</p>
    </div>
  );
}