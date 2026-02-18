import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  numeric,
  boolean,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";

export const waitlistTypeEnum = pgEnum("waitlist_type", [
  "STORE",
  "RIDER",
  "CUSTOMER",
]);

export const waitlistStatusEnum = pgEnum("waitlist_status", [
  "NEW",
  "CONTACTED",
  "CONVERTED",
  "ONBOARDED",
  "REJECTED",
]);

export const waitlistEntries = pgTable("waitlist_entries", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: waitlistTypeEnum("type").notNull(),

  // Common fields
  name: text("name").notNull(),
  phone: text("phone").notNull().unique(),
  email: text("email"),
  area: text("area").notNull(),

  // Store specific
  storeName: text("store_name"),
  category: text("category"),
  avgDailyOrders: integer("avg_daily_orders"),
  avgOrderValue: numeric("avg_order_value", { precision: 10, scale: 2 }),
  currentCommission: numeric("current_commission", { precision: 5, scale: 2 }),
  currentPlatform: text("current_platform"),
  interestedIn15Percent: boolean("interested_in_15_percent"),

  // Rider specific
  whatsapp: text("whatsapp"),
  ownsBike: boolean("owns_bike"),
  dailyEarnings: numeric("daily_earnings", { precision: 10, scale: 2 }),
  availabilityHours: integer("availability_hours"),
  flexibleShiftInterest: boolean("flexible_shift_interest"),

  // Customer specific
  interestCategory: text("interest_category"),
  wantsLaunchDiscount: boolean("wants_launch_discount"),

  // UTM tracking
  utmSource: text("utm_source"),
  utmCampaign: text("utm_campaign"),
  utmMedium: text("utm_medium"),

  status: waitlistStatusEnum("status").default("NEW").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("idx_waitlist_type").on(table.type),
  index("idx_waitlist_area").on(table.area),
  index("idx_waitlist_status").on(table.status),
  index("idx_waitlist_created_at").on(table.createdAt),
]);

export type WaitlistEntry = typeof waitlistEntries.$inferSelect;
export type NewWaitlistEntry = typeof waitlistEntries.$inferInsert;
