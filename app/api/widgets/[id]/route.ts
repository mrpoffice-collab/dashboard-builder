import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth";

type RouteParams = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.widget.findFirst({
      where: { id },
      include: {
        dashboard: { select: { userId: true } },
      },
    });

    if (!existing || existing.dashboard.userId !== userId) {
      return NextResponse.json(
        { error: "Widget not found" },
        { status: 404 }
      );
    }

    const { title, config, dataConfig, position } = await request.json();

    const widget = await prisma.widget.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(config && { config }),
        ...(dataConfig && { dataConfig }),
        ...(position && { position }),
      },
    });

    return NextResponse.json({ widget });
  } catch (error) {
    console.error("Update widget error:", error);
    return NextResponse.json(
      { error: "Failed to update widget" },
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

    const existing = await prisma.widget.findFirst({
      where: { id },
      include: {
        dashboard: { select: { userId: true } },
      },
    });

    if (!existing || existing.dashboard.userId !== userId) {
      return NextResponse.json(
        { error: "Widget not found" },
        { status: 404 }
      );
    }

    await prisma.widget.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete widget error:", error);
    return NextResponse.json(
      { error: "Failed to delete widget" },
      { status: 500 }
    );
  }
}
