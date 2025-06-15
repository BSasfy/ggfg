"use server";

import { neon } from "@neondatabase/serverless";

export default async function create(formData: FormData) {
  console.log(formData, "<<<<");
  // Connect to the Neon database
  const sql = neon(`${process.env.DATABASE_URL}`);
  const comment = formData.get("comment");
  // Insert the comment from the form into the Postgres database
  await sql`INSERT INTO comments (comment) VALUES (${comment})`;

  const data = await sql`SELECT * FROM comments`;
  console.log(data, "<<<<");
}
