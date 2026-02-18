import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { waitlistEntries } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // STORE | RIDER | CUSTOMER | all

    if (type && ["STORE", "RIDER", "CUSTOMER"].includes(type)) {
      const [result] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(waitlistEntries)
        .where(eq(waitlistEntries.type, type as "STORE" | "RIDER" | "CUSTOMER"));
      return NextResponse.json({
        type,
        count: result?.count ?? 0,
      });
    }

    const [stores, riders, customers] = await Promise.all([
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(waitlistEntries)
        .where(eq(waitlistEntries.type, "STORE")),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(waitlistEntries)
        .where(eq(waitlistEntries.type, "RIDER")),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(waitlistEntries)
        .where(eq(waitlistEntries.type, "CUSTOMER")),
    ]);

    return NextResponse.json({
      stores: stores[0]?.count ?? 0,
      riders: riders[0]?.count ?? 0,
      customers: customers[0]?.count ?? 0,
      total:
        (stores[0]?.count ?? 0) +
        (riders[0]?.count ?? 0) +
        (customers[0]?.count ?? 0),
    });
  } catch (error) {
    console.error("Count error:", error);
    return NextResponse.json(
      { error: "Failed to fetch count" },
      { status: 500 }
    );
  }
}
