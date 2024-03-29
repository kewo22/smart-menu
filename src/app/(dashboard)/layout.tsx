import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";

import SessionProvider from "@/components/shared/SessionProvider";

import "../globals.css";
import SideMenu from "../_components/SideMenu";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Smart Menu",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    // <html lang="en">
    // <body className={`${inter.className}`}>
    <SessionProvider session={session}>
      <div className="flex flex-row bg-slate-200 h-screen overflow-hidden p-5 gap-5">
        <SideMenu />
        <main className="flex-grow bg-white rounded-lg shadow-xl p-5">
          {children}
        </main>
      </div>
    </SessionProvider>
    // </body>
    // </html>
  );
}
