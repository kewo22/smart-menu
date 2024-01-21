'use server';

import { db } from "@/_lib/db";
import { CreateUserValidatePayload } from "../create-user/_components/form";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default async function createUser(user: CreateUserValidatePayload) {
    const userObj = {
        ...user,
        hashedPassword: "wdwq",
        emailVerified: new Date()
    }
    try {
        const user = await db.user.create({
            data: userObj
        })
        console.log("🚀 ~ createUser ~ user:", user)
        return { message: `Added todo` };
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                console.log("🚀 ~ createUser ~ e:", e)
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                )
            }
        }
        // throw e
        return { error: "Failed to create todo" };
    }
}