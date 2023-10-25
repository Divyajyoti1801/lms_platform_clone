import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const isAuthorized = isTeacher(userId);
    const { title } = await req.json();
    if (!userId || !isAuthorized) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
