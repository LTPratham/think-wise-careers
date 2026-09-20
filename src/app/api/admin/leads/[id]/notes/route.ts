import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTeamMember } from "@/lib/rbac";
import { LeadNoteSchema } from "@/lib/validators";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireTeamMember();
  if (auth instanceof NextResponse) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: leadId } = await params;

  try {
    const body = await req.json();
    const validated = LeadNoteSchema.parse(body);

    const note = await prisma.leadNote.create({
      data: {
        leadId,
        authorId: auth.user.id,
        content: validated.content,
      },
      include: {
        author: {
          select: { name: true, role: true },
        },
      },
    });

    return NextResponse.json({ success: true, note });
  } catch (error: any) {
    console.error("[Lead Note Create Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add note" },
      { status: 400 }
    );
  }
}
