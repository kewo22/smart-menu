"use client";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Page() {
  const arr = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

  return (
    <div className="h-full overflow-hidden flex flex-col gap-5">
      <h2 className="flex items-center text-lg">
        <span>Create Menu</span>
        <ChevronRightIcon className="h-5 2-5" />
        <span>Choose Template</span>
      </h2>
      <div className="h-full overflow-hidden flex flex-row">
        <div className="grid grid-cols-4 gap-5 h-full overflow-auto flex-[0_0_60%]">
          {arr.map((item, i) => {
            return (
              <div key={i} className="">
                <Image
                  src="/sample-menu-card.webp"
                  alt=""
                  height={180}
                  width={150}
                  priority
                />
              </div>
            );
          })}
        </div>

        {/* VIEWER */}
        <div className="flex-grow">Viewer</div>
      </div>
    </div>
  );
}
