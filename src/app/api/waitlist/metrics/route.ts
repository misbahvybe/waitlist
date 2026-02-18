import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { waitlistEntries } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET() {
  try {
    const [stores, riders, customers, areaDistribution, avgCommission, avgEarnings] =
      await Promise.all([
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
        db
          .select({
            area: waitlistEntries.area,
            type: waitlistEntries.type,
            count: sql<number>`count(*)::int`,
          })
          .from(waitlistEntries)
          .groupBy(waitlistEntries.area, waitlistEntries.type),
        db
          .select({
            avg: sql<string>`avg(current_commission::numeric)`,
          })
          .from(waitlistEntries)
          .where(eq(waitlistEntries.type, "STORE")),
        db
          .select({
            avg: sql<string>`avg(daily_earnings::numeric)`,
          })
          .from(waitlistEntries)
          .where(eq(waitlistEntries.type, "RIDER")),
      ]);

    const totalStores = stores[0]?.count ?? 0;
    const totalRiders = riders[0]?.count ?? 0;
    const totalCustomers = customers[0]?.count ?? 0;

    const areaBreakdown = areaDistribution.reduce(
      (acc, row) => {
        const key = `${row.area}-${row.type}`;
        acc[key] = row.count;
        return acc;
      },
      {} as Record<string, number>
    );

    return NextResponse.json({
      totalStores,
      totalRiders,
      totalCustomers,
      totalSignups: totalStores + totalRiders + totalCustomers,
      areaDistribution: areaBreakdown,
      avgStoreCommission: avgCommission[0]?.avg
        ? parseFloat(avgCommission[0].avg)
        : null,
      avgRiderEarnings: avgEarnings[0]?.avg
        ? parseFloat(avgEarnings[0].avg)
        : null,
    });
  } catch (error) {
    console.error("Metrics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
