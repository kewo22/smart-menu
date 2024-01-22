import { AuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt'
import { JWT } from 'next-auth/jwt'
import jsonwebtoken from 'jsonwebtoken'
import { db } from '@/_lib/db';
import CredentialsProvider from "next-auth/providers/credentials";
import { AUTH_ERROR } from '@/_lib/constants/auth-error';

console.log(process.env.NEXTAUTH_SECRET)
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
                try {
                    const user = await db.user.findFirstOrThrow({
                        where: {
                            email: credentials.email
                        }
                    });
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
                } catch (e) {
                    return null
                }

                // if no user was found 

            },
        })
    ],
    // secret: 'jld5EtQPTr3Gc3MswXBvn1R9mys+Fh/cDq14x7Lq2lY=',
    pages: {
        signIn: "/login",
        error: '/login'
    },

    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },

        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },

    // jwt: {
    //     encode: ({ secret, token }) => {
    //         const encodedToken = jsonwebtoken.sign(
    //             {
    //                 ...token,
    //                 iss: process.env.ISSUER_URL,
    //                 exp: Math.floor(Date.now() / 1000) + 60 * 60,
    //             },
    //             secret,
    //         )
    //         return encodedToken
    //     },
    //     decode: async ({ secret, token }) => {
    //         const decodedToken = jsonwebtoken.verify(token!, secret)
    //         return decodedToken as JWT
    //     },
    // },
}
