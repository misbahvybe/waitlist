import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { waitlistEntries } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // STORE | RIDER | CUSTOMER

    const entries =
      type && ["STORE", "RIDER", "CUSTOMER"].includes(type)
        ? await db
            .select()
            .from(waitlistEntries)
            .where(eq(waitlistEntries.type, type as "STORE" | "RIDER" | "CUSTOMER"))
            .orderBy(desc(waitlistEntries.createdAt))
        : await db
            .select()
            .from(waitlistEntries)
            .orderBy(desc(waitlistEntries.createdAt));

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Admin waitlist fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch waitlist" },
      { status: 500 }
    );
  }
}
