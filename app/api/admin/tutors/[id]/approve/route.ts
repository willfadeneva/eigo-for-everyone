import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendTutorApprovedEmail } from "@/lib/email";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tutor = await prisma.tutorProfile.update({
      where: { id: params.id },
      data:  { isApproved: true, isActive: true },
      include: { user: { select: { email: true, name: true } } },
    });

    // Fire approval email (non-blocking)
    if (tutor.user.email) {
      sendTutorApprovedEmail({
        to:         tutor.user.email,
        tutorName:  tutor.displayName || tutor.user.name || "Tutor",
      }).catch(console.error);
    }

    return NextResponse.json({ success: true, tutorId: tutor.id });
  } catch (err: any) {
    console.error("[admin/approve]", err);
    if (err?.code === "P2025") {
      return NextResponse.json({ error: "Tutor not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to approve tutor" }, { status: 500 });
  }
}
