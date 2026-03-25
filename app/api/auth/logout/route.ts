import { NextResponse } from "next/server";
import { deleteCurrentSession } from "@/lib/auth/session";

export async function POST() {
  try {
    await deleteCurrentSession();

    // ✅ Return a proper success response
    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  } catch (error) {
    console.error("LOGOUT_ERROR", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}