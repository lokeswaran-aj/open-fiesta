CREATE TABLE "rate_limit" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"last_input_id" uuid NOT NULL,
	"message_count" integer DEFAULT 1 NOT NULL,
	"reset_time" timestamp NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "rate_limit_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "rate_limit" ADD CONSTRAINT "rate_limit_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;