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
    isLoading: isTemplateLoading,
  } = useSWR<Menu>("/api/menu", Fetcher, {
    revalidateOnFocus: false,
  });

  const { data: menu, isLoading: isMenuLoading } = useSWR<any>(
    template ? `/api/menu/template/${template.sheetId}` : null,
    Fetcher
  );

  if (isTemplateLoading || isMenuLoading) {
    return <h1>Loading</h1>;
  }

  // console.log("🚀 ~ Page ~ menu:", menu);
  menu?.data?.forEach((val: any) => {
    console.log(val)
  });

  if (template && menu && params.slug[0] === "t1") {
    return <Template1 />;
  }

  if (template && menu && params.slug[0] === "t2") {
    return <Template2 />;
  }

  if (template && menu && params.slug[0] === "t3") {
    return <Template3 />;
  }

  return <h1>My Page</h1>;
}
