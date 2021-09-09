set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"hashPassword" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."recordings" (
	"recordingId" serial NOT NULL,
	"userId" int NOT NULL,
	"url" TEXT NOT NULL,
	"title" TEXT NOT NULL,
	"recordingLength" TEXT NOT NULL,
	"recordedAt" timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT "recordings_pk" PRIMARY KEY ("recordingId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."favorite" (
	"userId" int NOT NULL,
	"recordingId" int NOT NULL,
	"favoritedAt" timestamptz NOT NULL DEFAULT NOW()
) WITH (
  OIDS=FALSE
);




ALTER TABLE "recordings" ADD CONSTRAINT "recordings_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "favorite" ADD CONSTRAINT "favorite_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_fk1" FOREIGN KEY ("recordingId") REFERENCES "recordings"("userId");
