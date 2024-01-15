import NextAuth, { AuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt'

import { db } from '@/_lib/db';
import CredentialsProvider from "next-auth/providers/credentials";
import { AUTH_ERROR } from '@/_lib/constants/auth-error';
// https://www.youtube.com/watch?v=md65iBX5Gxg

const USERS = [
    {
        id: "1",
        name: "Kewin",
        email: "kewin@gmail.com",
        password: "pass"
    }
]

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: "Email",
                    placeholder: "Enter email",
                },
                password: {
                    label: "Password",
                    placeholder: "Enter password",
                }
            },
            async authorize(credentials, req) {
                if (!credentials || !credentials.email || !credentials.password) throw new Error(AUTH_ERROR.NO_CRED);
                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                // if no user was found 
                if (!user || !user?.hashedPassword) {
                    throw new Error(AUTH_ERROR.NO_USER)
                }

                // check to see if password matches
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

                // if password does not match
                if (!passwordMatch) {
                    throw new Error(AUTH_ERROR.INVALID_PASS)
                }

                return user;

            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
        error: '/login'
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }