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
      content TEXT,
      published BOOLEAN NOT NULL DEFAULT false,
      "authorId" uuid NOT NULL,
      FOREIGN KEY ("authorId") REFERENCES "public"."User"(id),
      PRIMARY KEY (id)
    );

    CREATE TABLE "public"."Profile" (
      id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4 (),
      bio TEXT,
      "userId" uuid UNIQUE NOT NULL,
      FOREIGN KEY ("userId") REFERENCES "public"."User"(id),
      PRIMARY KEY (id)
    );

    -- Seed some data
    insert into "public"."User"(name,email) values ('Matt','matt.voget@gmail.com');

  END
$$;
