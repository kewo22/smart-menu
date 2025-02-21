"use client";

import Template1 from "./template-1";
import Template2 from "./template-2";
import Template3 from "./template-3";

import useSWR from "swr";
import type { Menu } from "@prisma/client";
import { Fetcher } from "@/_lib/utils";
import { useEffect, useState, use } from "react";

export default function Page(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);
  // console.log("🚀 ~ Page ~ params:", params.slug[0]);

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

  const [menuObj, setMenuObj] = useState<any | null>(null);

  useEffect(() => {
    if (menu && menu.data) {
      const menuItems = [...menu.data];
      console.log(menuItems)
      const menuObj = convertArrayToObject(menuItems);
      setMenuObj(menuObj);
    }
  }, [menu]);

  if (isTemplateLoading || isMenuLoading) {
    return <h1>Loading</h1>;
  }

  const convertArrayToObject = (array: any[]) => {
    const result: any = {};
    let currentCategory = null;
    for (const item of array) {
      if (item.length === 1) {
        currentCategory = item[0];
        result[currentCategory] = {
          category: currentCategory,
          items: [],
        };
      } else {
        const itemName = item[0];
        const itemPrices = item[1]
          .split(",")
          .map((price: any) => parseInt(price));

        for (const price of itemPrices) {
          if (!isNaN(price)) {
            result[currentCategory].items.push({
              name: itemName,
              price: price,
            });
          }
        }
      }
    }

    return result;
  };

  if (template && menu && menuObj && params.slug[0] === "t1") {
    return <Template1 menuObj={menuObj} />;
  }

  if (template && menu && params.slug[0] === "t2") {
    return <Template2 />;
  }

  if (template && menu && params.slug[0] === "t3") {
    return <Template3 />;
  }

  return <h1>My Page</h1>;
}
