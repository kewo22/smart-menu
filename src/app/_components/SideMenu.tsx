"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Page() {
  const onLogOut = () => {
    signOut();
  };

  return (
    <div>
      <aside className="flex-[0_0_250px] bg-slate-300 rounded-lg p-5 flex flex-col h-full overflow-hidden">
        <Image
          src="/next.svg"
          width={150}
          height={150}
          alt="brand"
          className="mx-auto my-10"
        />
        <ul className="flex flex-col gap-5">
          <Link href="/">Dashboard</Link>
          <Link href="/menu-manage">Menu</Link>
          <Link href="/restaurant">Restaurant</Link>
        </ul>
        <ul className="mt-auto flex flex-col gap-5">
          <li>
            <Link href="/user">User</Link>
          </li>
          <li>
            <button onClick={onLogOut}>Logout</button>
          </li>
        </ul>
      </aside>
    </div>
  );
}
