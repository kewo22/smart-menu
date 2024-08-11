import { authOptions } from "@/_lib/auth-options";
import { db } from "@/_lib/db";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const restaurantId = (session?.user as any).restaurant[0].id;

  // have to return active menu
  const menu = await db.menu.findFirst({
    where: {
      restaurantId,
    },
  });

//   const restaurant = await db.restaurant.findFirst({
//     where: {
//       id: restaurantId,
//     },
//   });

  return Response.json(menu);
}
