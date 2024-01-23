import { authOptions } from "@/_lib/auth-options";
import { db } from "@/_lib/db";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {

    const session = await getServerSession(authOptions);

    const restaurants = await db.restaurant.findMany({
        where: {
            userId: (session?.user as any).id
        }
    })

    return Response.json(restaurants);
}