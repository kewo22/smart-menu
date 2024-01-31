"use client";

import React from "react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { connectToGl } from "@/app/actions/gl-sheet.actions";

export default function Page() {
  const router = useRouter();

  const onCreateClick = async () => {
    const result = await connectToGl();
    // console.log("🚀 ~ onCreateClick ~ result:", result)
  };

  return (
    <>
      <Button onClick={onCreateClick}>Create menu</Button>
    </>
  );
}
