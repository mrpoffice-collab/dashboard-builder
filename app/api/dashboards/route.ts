import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth";

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dashboards = await prisma.dashboard.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: {
        _count: { select: { widgets: true } },
      },
    });

    return NextResponse.json({ dashboards });
  } catch (error) {
    console.error("Get dashboards error:", error);
    return NextResponse.json(
      { error: "Failed to get dashboards" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const dashboard = await prisma.dashboard.create({
      data: {
        name,
        description,
        userId,
      },
    });

    return NextResponse.json({ dashboard }, { status: 201 });
  } catch (error) {
    console.error("Create dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to create dashboard" },
      { status: 500 }
    );
  }
}
