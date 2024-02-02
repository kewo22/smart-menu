import { authOptions } from '@/_lib/auth-options';
import bcrypt from 'bcrypt'
import CryptoJS from "crypto-js";
import { getServerSession } from 'next-auth';

export async function GET(request: Request) {
    const data = 1;
    return Response.json({ data });
}

export async function POST(request: Request) {
    const { pass } = await request.json()

    const session = await getServerSession(authOptions);

    const bytes = CryptoJS.AES.decrypt(pass, process.env.NEXTAUTH_SECRET!);
    const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

    const passwordMatch = await bcrypt.compare(decryptedPass, (session as any).user.hashedPassword)

    return Response.json({ passwordMatch });
}
