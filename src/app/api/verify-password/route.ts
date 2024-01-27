import bcrypt from 'bcrypt'

export async function GET(request: Request) {
    const data = 1;
    return Response.json({ data });
}

export async function POST(request: Request) {
    const { pass } = await request.json()

    const passwordMatch = await bcrypt.compare(pass, '$2b$10$5pd/TN1Z11g33CbTSFEXi.MX1hD503STT4scvedgisqILnCBBosDG')

    return Response.json({ pass, passwordMatch });
}
