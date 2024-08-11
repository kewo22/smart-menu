import { authOptions } from "@/_lib/auth-options";
import { db } from "@/_lib/db";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  const templates = await db.template.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return Response.json(templates);
}
