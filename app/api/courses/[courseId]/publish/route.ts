import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }
  } catch (error) {
    console.log("COURSE_ID_PUBLISH", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
