import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/rbac";
import bcrypt from "bcryptjs";
import { TeamUserSchema } from "@/lib/validators";

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      lastLoginAt: true,
      createdAt: true,
      _count: {
        select: {
          assignedLeads: true,
          assignedBookings: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ users });
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = TeamUserSchema.parse(body);

    const existing = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A team member with this email already exists" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(validated.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        passwordHash,
        role: validated.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error: any) {
    console.error("[Team User Create Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create team member" },
      { status: 400 }
    );
  }
}
