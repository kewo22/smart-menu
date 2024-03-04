"use client";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="h-full overflow-hidden flex flex-col gap-5">
      <h2 className="flex items-center text-lg">
        <span>Create Menu</span>
        <ChevronRightIcon className="h-5 2-5" />
        <span>Choose Template</span>
      </h2>
      <div className="h-full overflow-hidden flex flex-row">
        <div className="grid grid-cols-4 gap-5 h-full overflow-auto flex-[0_0_60%]">
          {/* Select bg / border style <br />
          Select font style <br />
          Select category style <br />
          Select item / price style <br /> */}
          <div>qwdwqd</div>
          <div>qwdwqd</div>
          <div>qwdwqd</div>
          <div>qwdwqd</div>
          <div>qwdwqd</div>
        </div>

        {/* VIEWER */}
        {/* <div className="flex-grow">
          Viewer
          <br />
          <Button variant="default">Download template</Button>
        </div> */}

        <div className="box clipped flex-grow h-full">
          MENU HERE
          {/* <Image src='/sample-menu-card.webp' alt="" priority height={100} width={100} className="h-full w-full" /> */}
        </div>
      </div>
    </div>
  );
}
