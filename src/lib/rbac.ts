import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

type Role = "ADMIN" | "EDITOR" | "COUNSELLOR";

/**
 * Get the current authenticated session and validate role.
 * Returns the session if authorized, or a NextResponse error.
 */
export async function requireRole(...allowedRoles: Role[]) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const userRole = (session.user as { role: string }).role as Role;

  if (!allowedRoles.includes(userRole)) {
    return NextResponse.json(
      { error: "Insufficient permissions" },
      { status: 403 }
    );
  }

  return {
    user: {
      id: (session.user as { id: string }).id,
      email: session.user.email!,
      name: session.user.name!,
      role: userRole,
    },
  };
}

/**
 * Require any logged-in team member (Counsellor, Editor, or Admin)
 */
export async function requireTeamMember() {
  return requireRole("COUNSELLOR", "EDITOR", "ADMIN");
}

/**
 * Require at least Editor role (Editor or Admin)
 */
export async function requireEditor() {
  return requireRole("EDITOR", "ADMIN");
}

/**
 * Require Admin role only
 */
export async function requireAdmin() {
  return requireRole("ADMIN");
}

