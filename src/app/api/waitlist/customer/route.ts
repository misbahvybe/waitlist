import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { waitlistEntries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      area,
      interestCategory,
      wantsLaunchDiscount,
      utm_source,
      utm_campaign,
      utm_medium,
    } = body;

    if (!name || !phone || !area) {
      return NextResponse.json(
        { error: "Missing required fields: name, phone, area" },
        { status: 400 }
      );
    }

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
        type: "CUSTOMER",
        name: name,
        phone: phone.trim(),
        area: area,
        interestCategory: interestCategory || null,
        wantsLaunchDiscount:
          wantsLaunchDiscount === true ||
          wantsLaunchDiscount === "true" ||
          wantsLaunchDiscount === "Yes",
        utmSource: utm_source || null,
        utmCampaign: utm_campaign || null,
        utmMedium: utm_medium || null,
      })
      .returning();

    return NextResponse.json({
      success: true,
      id: entry.id,
      count: await getCustomerCount(),
    });
  } catch (error) {
    console.error("Customer waitlist error:", error);
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    );
  }
}

async function getCustomerCount() {
  const result = await db
    .select()
    .from(waitlistEntries)
    .where(eq(waitlistEntries.type, "CUSTOMER"));
  return result.length;
}
