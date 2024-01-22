'use server';

import { db } from "@/_lib/db";
import { CreateUserValidatePayload } from "../create-user/_components/form";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { logger } from "../../../logger";
import bcrypt from 'bcrypt'

export default async function createUser(user: CreateUserValidatePayload) {

    const saltRounds = 10;
    const myPlaintextPassword = user.userName + Date.now();

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync('pass', salt);

    const userObj = {
        ...user,
        hashedPassword: hash,
        emailVerified: new Date()
    }

    try {
        const user = await db.user.create({
            data: userObj
        })
        return { message: `User Added` };
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            logger.error(JSON.stringify(e));
            // if (e.code === 'P2002') {
            //     console.log("🚀 ~ createUser ~ e:", e)
            //     console.log(
            //         'There is a unique constraint violation, a new user cannot be created with this email'
            //     )
            // }
        }
        // throw e
        return { error: "Failed to create user" };
    }
}