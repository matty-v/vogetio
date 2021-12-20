DO $$
  BEGIN
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE "public"."User" (
      id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4 (),
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      PRIMARY KEY (id)
    );

    CREATE TABLE "public"."Post" (
      id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4 (),
      title VARCHAR(255) NOT NULL,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      content TEXT,
      published BOOLEAN NOT NULL DEFAULT false,
      pinned BOOLEAN NOT NULL DEFAULT false,
      "authorId" uuid NOT NULL,
      FOREIGN KEY ("authorId") REFERENCES "public"."User"(id),
      PRIMARY KEY (id)
    );

    CREATE TABLE "public"."Tag" (
      id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4 (),
      name VARCHAR(255),
      PRIMARY KEY (id)
    );

    CREATE TABLE "public"."TagsOnPosts" (
      "tagId" uuid NOT NULL,
      "postId" uuid NOT NULL,
      "assignedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY ("tagId")  REFERENCES "public"."Tag"(id),
      FOREIGN KEY ("postId") REFERENCES "public"."Post"(id)
    );
    CREATE UNIQUE INDEX "TagsOnPosts_tag_post_unique" ON "public"."TagsOnPosts" USING btree("tagId", "postId");

    -- Seed the first (and for now only) user
    insert into "public"."User"(name,email) values ('Matt','matt.voget@gmail.com');

  END
$$;
