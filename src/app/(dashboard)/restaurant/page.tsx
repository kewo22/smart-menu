"use client";

import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import type { Restaurant } from "@prisma/client";

import { Fetcher } from "@/_lib/utils";
import Form from "./_components/form";
import Restaurants from "./_components/restaurants";

export default function Page() {
  const { data, error, isLoading } = useSWR<Restaurant[]>(
    "/api/restaurant",
    Fetcher
  );

  const [restaurantsData, setRestaurantsData] = useState<Restaurant[]>(
    data || []
  );

  useEffect(() => {
    if (data) setRestaurantsData(data);
  }, [data]);

  const onRestaurantCreated = (restaurant: Restaurant) => {
    setRestaurantsData((restaurants: Restaurant[]) => {
      const fullRestaurants = [...restaurants, restaurant];
      restaurants = fullRestaurants;
      return [...restaurants];
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-2xl">Manage Restaurant</h1>
      <div className="w-full flex flex-row gap-5">
        <div className="flex-grow">
          <Restaurants data={restaurantsData} isLoading={isLoading} />
        </div>
        <div className="flex-[0_0_30%]">
          <Form onRestaurantCreated={onRestaurantCreated} />
        </div>
      </div>
    </div>
  );
}
