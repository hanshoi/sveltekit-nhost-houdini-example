
alter table "public"."todos" drop constraint "todos_user_id_fkey",
  add constraint "todos_user_id_fkey"
  foreign key ("user_id")
  references "auth"."users"
  ("id") on update restrict on delete set null;

alter table "public"."todos" drop constraint "todos_user_id_fkey";
DROP TABLE "public"."todos";
