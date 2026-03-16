import { NextRequest, NextResponse } from "next/server";
import { generateZoomSignature, lessonSessionName, type ZoomRole } from "@/lib/zoom";

export async function POST(req: NextRequest) {
  try {
    const { lessonId, role } = await req.json() as { lessonId: string; role: ZoomRole };

    if (!lessonId || role === undefined) {
      return NextResponse.json({ error: "lessonId and role are required" }, { status: 400 });
    }

    // TODO Phase 2: validate the requesting user is a participant of this lesson
    // const session = await getServerSession();
    // const lesson = await prisma.lesson.findUnique({ where: { id: lessonId }, include: { booking: true } });
    // if (!lesson || (lesson.booking?.studentId !== session?.user.id && lesson.tutorId !== session?.user.id)) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    // }

    const sessionName = lessonSessionName(lessonId);
    const signature = generateZoomSignature(sessionName, role);
    const sdkKey = process.env.ZOOM_SDK_KEY!;

    return NextResponse.json({ signature, sdkKey, sessionName });
  } catch (err) {
    console.error("[zoom/signature]", err);
    return NextResponse.json({ error: "Failed to generate signature" }, { status: 500 });
  }
}
