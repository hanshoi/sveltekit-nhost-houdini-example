
CREATE TABLE "public"."todos" (
  "id" serial NOT NULL, 
  "title" text NOT NULL, 
  "description" text, 
  "is_completed" boolean NOT NULL DEFAULT false, 
  "user_id" uuid NOT NULL, PRIMARY KEY ("id") 
); COMMENT ON TABLE "public"."todos" IS E'Very TODO table.';

alter table "public"."todos" add constraint "todos_user_id_fkey"
  foreign key ("user_id")
  references "auth"."users"
  ("id") on update restrict on delete restrict;
