CREATE INDEX "idx_waitlist_type" ON "waitlist_entries" USING btree ("type");--> statement-breakpoint
CREATE INDEX "idx_waitlist_area" ON "waitlist_entries" USING btree ("area");--> statement-breakpoint
CREATE INDEX "idx_waitlist_status" ON "waitlist_entries" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_waitlist_created_at" ON "waitlist_entries" USING btree ("created_at");