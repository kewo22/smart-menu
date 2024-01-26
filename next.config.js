/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        DATABASE_URL: process.env.DATABASE_URL,
        BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sm-blob-storage.public.blob.vercel-storage.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: '933elfvt8pwv7r5l.public.blob.vercel-storage.com',
                port: '',
              },
        ],
    }
}

module.exports = nextConfig
