"use client";

import React from "react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function Page() {
  const router = useRouter();

  const onCreateClick = () => {
    router.push("/menu/create");
  };

  return <Button onClick={onCreateClick}>Create menu</Button>;
}
