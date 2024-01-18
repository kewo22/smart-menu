'use server';

import { db } from "@/_lib/db";
import { CreateUserValidatePayload } from "../create-user/_components/form";

export default async function createUser(user: CreateUserValidatePayload) {
    const userObj = {
        ...user,
        hashedPassword: "wdwq",
        emailVerified: new Date()
    }
    try {
        throw Error("ERRRRRRRRRRRRRRRRRRRRRR")
        const user = await db.user.create({
            data: userObj
        })
        return { message: `Added todo` };
    } catch (e) {
        return { error: "Failed to create todo" };
    }
}