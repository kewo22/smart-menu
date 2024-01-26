"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import type { Restaurant } from "@prisma/client";

import { Fetcher } from "@/_lib/utils";
import Form from "./_components/form";
import Restaurants from "./_components/restaurants";

export default function Page() {
  const { data, error, isLoading } = useSWR<Restaurant[]>(
    "/api/restaurant",
    Fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const [restaurantsData, setRestaurantsData] = useState<Restaurant[]>(
    data || []
  );
  const [restaurantToEdit, setRestaurantToEdit] = useState<Restaurant | null>(
    null
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

  const onEditClick = useCallback((row: Restaurant) => {
    setRestaurantToEdit(row);
  }, []);

  const onRestaurantEdited = (restaurant: Restaurant) => {
    const restaurantCopy = [...restaurantsData];
    const index = restaurantsData.findIndex((r) => {
      return r.id === restaurant.id;
    });
    if (index > -1) {
      restaurantCopy.splice(index, 1, restaurant);
    }
    setRestaurantsData(restaurantCopy);
    setRestaurantToEdit(null);
  };

  const onDeleteSuccess = useCallback(
    (restaurant: Restaurant) => {
      const restaurantCopy = [...restaurantsData];
      const index = restaurantsData.findIndex((r) => {
        return r.id === restaurant.id;
      });
      if (index > -1) {
        restaurantCopy.splice(index, 1);
      }
      setRestaurantsData(restaurantCopy);
    },
    [restaurantsData]
  );

  const onResetRestaurantForm = useCallback(() => {
    setRestaurantToEdit(null);
  }, []);

  return (
    <div className="flex flex-col gap-10 h-full overflow-hidden">
      <h1 className="text-2xl">Manage Restaurant</h1>
      <div className="w-full flex flex-row gap-5 h-full overflow-hidden">
        <div className="flex-grow">
          <Restaurants
            data={restaurantsData}
            isLoading={isLoading}
            onEditRow={onEditClick}
            onDeleteSuccess={onDeleteSuccess}
          />
        </div>
        <div className="flex-[0_0_30%] h-full overflow-auto">
          <Form
            onRestaurantCreated={onRestaurantCreated}
            onRestaurantEdited={onRestaurantEdited}
            onResetRestaurantForm={onResetRestaurantForm}
            formData={restaurantToEdit}
          />
        </div>
      </div>
    </div>
  );
}
