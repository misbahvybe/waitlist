import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { waitlistEntries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      storeName,
      ownerName,
      phone,
      email,
      area,
      category,
      currentPlatform,
      avgDailyOrders,
      avgOrderValue,
      currentCommission,
      interestedIn15Percent,
      utm_source,
      utm_campaign,
      utm_medium,
    } = body;

    if (!storeName || !ownerName || !phone || !email || !area || !category) {
      return NextResponse.json(
        { error: "Missing required fields: storeName, ownerName, phone, email, area, category" },
        { status: 400 }
      );
    }

    // Basic phone validation (Pakistani format)
    const phoneRegex = /^[\d\s\-\+]{10,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      return NextResponse.json(
        { error: "Invalid phone format" },
        { status: 400 }
      );
    }

    const [existing] = await db
      .select()
      .from(waitlistEntries)
      .where(eq(waitlistEntries.phone, phone));

    if (existing) {
      return NextResponse.json(
        { error: "This phone number is already registered" },
        { status: 409 }
      );
    }

    const [entry] = await db
      .insert(waitlistEntries)
      .values({
        type: "STORE",
        name: ownerName,
        phone: phone.trim(),
        email: email?.trim() || null,
        area: area,
        storeName: storeName,
        category: category,
        currentPlatform: currentPlatform || null,
        avgDailyOrders: avgDailyOrders ? parseInt(avgDailyOrders, 10) : null,
        avgOrderValue: avgOrderValue ? String(avgOrderValue) : null,
        currentCommission: currentCommission ? String(currentCommission) : null,
        interestedIn15Percent: interestedIn15Percent ?? false,
        utmSource: utm_source || null,
        utmCampaign: utm_campaign || null,
        utmMedium: utm_medium || null,
      })
      .returning();

    return NextResponse.json({
      success: true,
      id: entry.id,
      count: await getStoreCount(),
    });
  } catch (error) {
    console.error("Store waitlist error:", error);
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    );
  }
}

async function getStoreCount() {
  const result = await db
    .select()
    .from(waitlistEntries)
    .where(eq(waitlistEntries.type, "STORE"));
  return result.length;
}
