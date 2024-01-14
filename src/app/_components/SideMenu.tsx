"use client";
import React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function Page() {
  const onLogOut = () => {
    signOut();
  };

  return (
    <aside className="flex-[0_0_250px] bg-slate-300 rounded-lg p-5 flex flex-col h-full overflow-hidden">
      <Image
        src="/next.svg"
        width={150}
        height={150}
        alt="brand"
        className="mx-auto my-10"
      />
      <ul className="">
        <li>Dashboard</li>
        <li>Menu</li>
      </ul>
      <ul className="mt-auto">
        <li>User</li>
        <li>
          <button onClick={onLogOut}>Logout</button>
        </li>
      </ul>
    </aside>
  );
}
