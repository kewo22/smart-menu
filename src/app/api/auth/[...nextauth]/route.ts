import NextAuth from 'next-auth'

import { authOptions } from '@/_lib/auth-options';
// https://www.youtube.com/watch?v=md65iBX5Gxg

const USERS = [
    {
        id: "1",
        name: "Kewin",
        email: "kewin@gmail.com",
        password: "pass"
    }
]

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }