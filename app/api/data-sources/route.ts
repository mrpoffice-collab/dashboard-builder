import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth";
import { demoSalesData, demoMarketingData, demoOperationsData } from "@/lib/demo-data";
import Papa from "papaparse";

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dataSources = await prisma.dataSource.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ dataSources });
  } catch (error) {
    console.error("Get data sources error:", error);
    return NextResponse.json(
      { error: "Failed to get data sources" },
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

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File;
      const name = (formData.get("name") as string) || file.name;

      if (!file) {
        return NextResponse.json({ error: "File is required" }, { status: 400 });
      }

      const text = await file.text();
      const parsed = Papa.parse(text, { header: true, dynamicTyping: true });

      if (parsed.errors.length > 0) {
        return NextResponse.json(
          { error: "Failed to parse CSV", details: parsed.errors },
          { status: 400 }
        );
      }

      const columns = parsed.meta.fields?.map((field) => ({
        name: field,
        type: typeof parsed.data[0]?.[field as keyof typeof parsed.data[0]] === "number" ? "number" : "string",
      })) || [];

      const dataSource = await prisma.dataSource.create({
        data: {
          userId,
          name,
          type: "csv",
          data: parsed.data as object[],
          columns,
        },
      });

      return NextResponse.json({ dataSource }, { status: 201 });
    } else {
      const { type, name } = await request.json();

      if (type !== "demo") {
        return NextResponse.json(
          { error: "Invalid data source type" },
          { status: 400 }
        );
      }

      let demoData;
      let columns;
      let dataName;

      switch (name) {
        case "sales":
          demoData = demoSalesData.data;
          columns = demoSalesData.columns;
          dataName = demoSalesData.name;
          break;
        case "marketing":
          demoData = demoMarketingData.data;
          columns = demoMarketingData.columns;
          dataName = demoMarketingData.name;
          break;
        case "operations":
          demoData = demoOperationsData.data;
          columns = demoOperationsData.columns;
          dataName = demoOperationsData.name;
          break;
        default:
          return NextResponse.json(
            { error: "Invalid demo data type" },
            { status: 400 }
          );
      }

      const dataSource = await prisma.dataSource.create({
        data: {
          userId,
          name: dataName,
          type: "demo",
          data: demoData,
          columns,
          config: { demoType: name },
        },
      });

      return NextResponse.json({ dataSource }, { status: 201 });
    }
  } catch (error) {
    console.error("Create data source error:", error);
    return NextResponse.json(
      { error: "Failed to create data source" },
      { status: 500 }
    );
  }
}
