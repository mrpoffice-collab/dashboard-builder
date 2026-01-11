import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth";

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: dashboardId } = await params;
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dashboard = await prisma.dashboard.findFirst({
      where: { id: dashboardId, userId },
    });

    if (!dashboard) {
      return NextResponse.json(
        { error: "Dashboard not found" },
        { status: 404 }
      );
    }

    const { type, title, config, dataConfig, position } = await request.json();

    if (!type || !title) {
      return NextResponse.json(
        { error: "Type and title are required" },
        { status: 400 }
      );
    }

    const widget = await prisma.widget.create({
      data: {
        dashboardId,
        type,
        title,
        config: config || {},
        dataConfig: dataConfig || {},
        position: position || { x: 0, y: 0, w: 4, h: 3 },
      },
    });

    return NextResponse.json({ widget }, { status: 201 });
  } catch (error) {
    console.error("Create widget error:", error);
    return NextResponse.json(
      { error: "Failed to create widget" },
      { status: 500 }
    );
  }
}
