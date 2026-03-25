"use client";

import { useSearchParams } from "next/navigation";

export default function CheckEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="max-w-md mx-auto mt-20 p-4">
      <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
      <p>
        Thank you for signing up! A verification link has been sent to{" "}
        <strong>{email}</strong>.
      </p>
      <p className="mt-2 text-gray-600">
        Please open your email and click the link to verify your account before logging in.
      </p>
    </div>
  );
}