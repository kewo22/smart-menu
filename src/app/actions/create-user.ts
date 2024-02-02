'use server';

import { getServerSession } from "next-auth";
import CryptoJS from "crypto-js";
import bcrypt from 'bcrypt'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// import { logger } from "../../../logger";
import { CreateUserValidatePayload } from "../create-user/_components/form";
import { db } from "@/_lib/db";
import { authOptions } from "@/_lib/auth-options";

export async function createUser(user: CreateUserValidatePayload) {
    const saltRounds = 10;
    const myPlaintextPassword = user.userName + Date.now();

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync('pass', salt);

    const userObj = {
        ...user,
        hashedPassword: hash,
        emailVerified: false
    }

    try {
        const user = await db.user.create({
            data: userObj
        })
        return { message: `User Added` };
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
        return { error: "Failed to create user" };
    }
}

export async function updatePassword(password: string) {

    const session = await getServerSession(authOptions);
    const bytes = CryptoJS.AES.decrypt(password, process.env.NEXTAUTH_SECRET!);
    const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(decryptedPass, salt);

    try {
        const user = await db.user.update(
            {
                where: {
                    id: (session?.user as any).id
                },
                data: {
                    hashedPassword: hash
                }
            }
        )
        return { message: `Password updated` };
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
        return { error: "Failed to update password" };
    }
}

