"use client";

import Template1 from "./template-1";
import Template2 from "./template-2";
import Template3 from "./template-3";

export default function Page({ params }: { params: { slug: string } }) {
  console.log("🚀 ~ Page ~ params:", params.slug[0]);

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
