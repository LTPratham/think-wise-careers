import { NextResponse } from "next/server";
import { requireEditor } from "@/lib/rbac";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

/**
 * Admin Image Upload API
 * 
 * Accepts multipart/form-data with a single "file" field.
 * Query param "type" controls destination: "country" | "university"
 * 
 * Returns: { url: "/uploads/countries/filename.ext" }
 */
export async function POST(req: Request) {
  try {
    const auth = await requireEditor();
    if (auth instanceof NextResponse) return auth;

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const uploadType = formData.get("type") as string || "country";

    if (!file || !file.size) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPG, PNG, WebP, SVG, GIF" },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB." },
        { status: 400 }
      );
    }

    // Determine upload directory
    const subDir = uploadType === "university" ? "universities" : "countries";
    const uploadDir = path.join(process.cwd(), "public", "uploads", subDir);

    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });

    // Generate clean filename: timestamp-slugified-original-name
    const ext = path.extname(file.name) || ".png";
    const baseName = file.name
      .replace(ext, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    const fileName = `${Date.now()}-${baseName}${ext}`;
    const filePath = path.join(uploadDir, fileName);

    // Write file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Return the public URL path
    const publicUrl = `/uploads/${subDir}/${fileName}`;

    console.log(`[Upload] ${uploadType} image saved: ${publicUrl} (${(file.size / 1024).toFixed(1)}KB)`);

    return NextResponse.json({ url: publicUrl, fileName, size: file.size });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
