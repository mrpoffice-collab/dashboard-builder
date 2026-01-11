import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth";
import crypto from "crypto";

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.dashboard.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Dashboard not found" },
        { status: 404 }
      );
    }

    const shareToken = crypto.randomBytes(16).toString("hex");

    const dashboard = await prisma.dashboard.update({
      where: { id },
      data: {
        shareToken,
        isPublic: true,
      },
    });

    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/share/${shareToken}`;

    return NextResponse.json({ shareToken, shareUrl, dashboard });
  } catch (error) {
    console.error("Share dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to share dashboard" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.dashboard.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Dashboard not found" },
        { status: 404 }
      );
    }

    await prisma.dashboard.update({
      where: { id },
      data: {
        shareToken: null,
        isPublic: false,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Revoke share error:", error);
    return NextResponse.json(
      { error: "Failed to revoke share link" },
      { status: 500 }
    );
  }
}
