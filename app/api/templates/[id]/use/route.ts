import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth";
import { templates, demoSalesData, demoMarketingData, demoOperationsData } from "@/lib/demo-data";

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: templateId } = await params;
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const template = templates.find((t) => t.id === templateId);
    if (!template) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    let demoData;
    switch (template.category) {
      case "sales":
        demoData = demoSalesData;
        break;
      case "marketing":
        demoData = demoMarketingData;
        break;
      case "operations":
        demoData = demoOperationsData;
        break;
      default:
        demoData = demoSalesData;
    }

    const dataSource = await prisma.dataSource.create({
      data: {
        userId,
        name: demoData.name,
        type: "demo",
        data: demoData.data,
        columns: demoData.columns,
        config: { demoType: template.category },
      },
    });

    const dashboard = await prisma.dashboard.create({
      data: {
        userId,
        name: template.name,
        description: template.description,
      },
    });

    const widgetPromises = template.config.widgets.map((widgetConfig) =>
      prisma.widget.create({
        data: {
          dashboardId: dashboard.id,
          type: widgetConfig.type,
          title: widgetConfig.title,
          config: widgetConfig.config,
          dataConfig: {
            ...widgetConfig.dataConfig,
            dataSourceId: dataSource.id,
          },
          position: widgetConfig.position,
        },
      })
    );

    await Promise.all(widgetPromises);

    const fullDashboard = await prisma.dashboard.findUnique({
      where: { id: dashboard.id },
      include: { widgets: true },
    });

    return NextResponse.json({ dashboard: fullDashboard, dataSource }, { status: 201 });
  } catch (error) {
    console.error("Use template error:", error);
    return NextResponse.json(
      { error: "Failed to create dashboard from template" },
      { status: 500 }
    );
  }
}
