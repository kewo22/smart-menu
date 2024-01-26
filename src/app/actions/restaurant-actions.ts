'use server';
import { getServerSession } from "next-auth";
import { put, PutBlobResult } from '@vercel/blob';

import type { Restaurant } from "@prisma/client";

// import { logger } from "../../../logger";
import { db } from "@/_lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { authOptions } from "@/_lib/auth-options";
import { revalidatePath } from "next/cache";
import { RestaurantCreate } from "../(dashboard)/restaurant/_components/form";

export async function CreateRestaurant(restaurant: RestaurantCreate) {
    const session = await getServerSession(authOptions);
    const restaurantObj = {
        name: restaurant.name,
        address: restaurant.address,
        userId: (session?.user as any).id,
        logo: restaurant.logoUrl
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

export async function DeleteRestaurant(id: string) {
    try {
        const restaurant = await db.restaurant.delete({
            where: {
                id
            }
        })
        console.log("🚀 ~ CreateRestaurant ~ restaurant:", restaurant)
        return { message: `Restaurant Delete`, restaurant };
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            console.log("🚀 ~ DeleteRestaurant ~ e:", e)
            // logger.error(JSON.stringify(e));
            // if (e.code === 'P2002') {
            //     console.log("🚀 ~ createUser ~ e:", e) 
            //     console.log(
            //         'There is a unique constraint violation, a new user cannot be created with this email'
            //     )
            // }
        }
        // throw e
        return { error: "Failed to delete restaurant" };
    }
}

export async function EditRestaurant(data: Restaurant) {
    try {
        const restaurant = await db.restaurant.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                address: data.address,
                userId: data.userId
            }
        })
        console.log("🚀 ~ CreateRestaurant ~ restaurant:", restaurant)
        return { message: `Restaurant Delete`, restaurant };
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            console.log("🚀 ~ DeleteRestaurant ~ e:", e)
            // logger.error(JSON.stringify(e));
            // if (e.code === 'P2002') {
            //     console.log("🚀 ~ createUser ~ e:", e) 
            //     console.log(
            //         'There is a unique constraint violation, a new user cannot be created with this email'
            //     )
            // }
        }
        // throw e
        return { error: "Failed to delete restaurant" };
    }
}

export async function UploadLogo(formData: any): Promise<PutBlobResult | { error: string }> {
    try {
        const logoFile = formData.get('logo') as File;
        const blob: PutBlobResult = await put(logoFile.name, logoFile, {
            access: 'public',
        });
        return blob;
    } catch (e) {
        return { error: "Failed to upload logo" };
    }
}
