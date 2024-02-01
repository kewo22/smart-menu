"use client";

import Template1 from "./template-1";
import Template2 from "./template-2";
import Template3 from "./template-3";

import useSWR from "swr";
import type { Menu } from "@prisma/client";
import { Fetcher } from "@/_lib/utils";

export default function Page({ params }: { params: { slug: string } }) {
  console.log("🚀 ~ Page ~ params:", params.slug[0]);

  const {
    data: template,
    error,
    isLoading,
  } = useSWR<Menu>("/api/menu", Fetcher, {
    revalidateOnFocus: false,
  });

  const { data: menu } = useSWR(
    template ? `/api/menu/template/${template.sheetId}` : null,
    Fetcher
  );

  console.log("🚀 ~ Page ~ menu:", menu);

  if (params.slug[0] === "t1") {
    return <Template1 />;
  }

  if (params.slug[0] === "t2") {
    return <Template2 />;
  }

  if (params.slug[0] === "t3") {
    return <Template3 />;
  }

  return <h1>My Page</h1>;
}
