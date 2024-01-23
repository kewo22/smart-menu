'use server';

import { db } from "@/_lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
// import { logger } from "../../../logger";
import { RestaurantValidatePayload } from "../(dashboard)/restaurant/_components/form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/auth-options";

export default async function CreateRestaurant(restaurant: RestaurantValidatePayload) {

    const session = await getServerSession(authOptions);

    const restaurantObj = {
        name: restaurant.name,
        address: restaurant.address,
        userId: (session?.user as any).id
    };

    try {
        const restaurant = await db.restaurant.create({
            data: restaurantObj
        })
        console.log("🚀 ~ CreateRestaurant ~ restaurant:", restaurant)
        return { message: `Restaurant Added`, restaurant };
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            // logger.error(JSON.stringify(e));
            // if (e.code === 'P2002') {
            //     console.log("🚀 ~ createUser ~ e:", e) 
            //     console.log(
            //         'There is a unique constraint violation, a new user cannot be created with this email'
            //     )
            // }
        }
        // throw e
        return { error: "Failed to create restaurant" };
    }
}