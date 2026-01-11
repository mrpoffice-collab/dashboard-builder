import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

type RouteParams = { params: Promise<{ token: string }> };

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { token } = await params;

    const dashboard = await prisma.dashboard.findFirst({
      where: {
        shareToken: token,
        isPublic: true,
      },
      include: {
        widgets: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!dashboard) {
      return NextResponse.json(
        { error: "Dashboard not found or not shared" },
        { status: 404 }
      );
    }

    const dataSourceIds = dashboard.widgets
      .map((w) => {
        const dataConfig = w.dataConfig as { dataSourceId?: string };
        return dataConfig?.dataSourceId;
      })
      .filter(Boolean) as string[];

    const dataSources = await prisma.dataSource.findMany({
      where: { id: { in: dataSourceIds } },
    });

    return NextResponse.json({ dashboard, dataSources });
  } catch (error) {
    console.error("Get shared dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to get dashboard" },
      { status: 500 }
    );
  }
}
