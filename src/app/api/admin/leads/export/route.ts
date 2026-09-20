import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/rbac";
import * as XLSX from "xlsx";

export async function GET(req: Request) {
  // Strict Admin-only check to prevent student database theft
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) {
    return NextResponse.json({ error: "Unauthorized: Admin access required to export student data" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const scope = searchParams.get("scope") || "all"; // "all" | "today"

  // Build date filter for today
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const whereClause: any =
    scope === "today"
      ? { createdAt: { gte: todayStart, lte: todayEnd } }
      : {};

  const leads = await prisma.lead.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });

  // Build rows for Excel
  const rows = leads.map((lead) => ({
    Name: lead.name,
    Phone: lead.phone,
    Email: lead.email && lead.email !== "no-email@example.com" ? lead.email : "",
    "Inquiry Type": lead.serviceInterest || "General Enquiry",
    Status: lead.status.replace(/_/g, " "),
    "Qualification Flag": lead.qualificationFlag,
    "Source Page": lead.sourcePage || "",
    Message: lead.message || "",
    "Date Submitted": new Date(lead.createdAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  // Create workbook
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows);

  // Column widths
  ws["!cols"] = [
    { wch: 22 }, // Name
    { wch: 15 }, // Phone
    { wch: 28 }, // Email
    { wch: 22 }, // Inquiry Type
    { wch: 18 }, // Status
    { wch: 18 }, // Qualification Flag
    { wch: 20 }, // Source Page
    { wch: 40 }, // Message
    { wch: 22 }, // Date Submitted
  ];

  XLSX.utils.book_append_sheet(wb, ws, scope === "today" ? "Today's Leads" : "All Leads");

  const filename =
    scope === "today"
      ? `leads_today_${new Date().toISOString().slice(0, 10)}.xlsx`
      : `leads_all_time_${new Date().toISOString().slice(0, 10)}.xlsx`;

  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  return new Response(buf, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
