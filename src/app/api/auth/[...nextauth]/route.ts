import NextAuth, { AuthOptions } from 'next-auth'

import CredentialsProvider from "next-auth/providers/credentials";

const USERS = [
    {
        id: "1",
        name: "Kewin",
        email: "kewin@gmail.com",
        password: "pass"
    }
]

export const authOptions: AuthOptions = {
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
                if (!credentials || !credentials.email || !credentials.password) return null;
                const user = USERS.find(user => user.email === credentials.email)
                if (!user) {
                    return null
                }
                if (user.password !== credentials.password) {
                    return null
                }
                return user
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }