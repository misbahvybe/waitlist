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
      whatsapp,
      area,
      ownsBike,
      currentPlatform,
      dailyEarnings,
      availabilityHours,
      flexibleShiftInterest,
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
        type: "RIDER",
        name: name,
        phone: phone.trim(),
        whatsapp: whatsapp?.trim() || phone.trim(),
        area: area,
        ownsBike: ownsBike === true || ownsBike === "true" || ownsBike === "Yes",
        currentPlatform: currentPlatform || null,
        dailyEarnings: dailyEarnings ? String(dailyEarnings) : null,
        availabilityHours: availabilityHours
          ? parseInt(availabilityHours, 10)
          : null,
        flexibleShiftInterest:
          flexibleShiftInterest === true ||
          flexibleShiftInterest === "true" ||
          flexibleShiftInterest === "Yes",
        utmSource: utm_source || null,
        utmCampaign: utm_campaign || null,
        utmMedium: utm_medium || null,
      })
      .returning();

    return NextResponse.json({
      success: true,
      id: entry.id,
      count: await getRiderCount(),
    });
  } catch (error) {
    console.error("Rider waitlist error:", error);
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    );
  }
}

async function getRiderCount() {
  const result = await db
    .select()
    .from(waitlistEntries)
    .where(eq(waitlistEntries.type, "RIDER"));
  return result.length;
}
