"use client";
import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import type { Restaurant } from "@prisma/client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitBtn } from "@/app/_components/SubmitBtn";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/_lib/utils";
import CreateRestaurant from "@/app/actions/create-restaurant";

const RestaurantSchema = z.object({
  name: z.string().trim().min(1, { message: "Required" }),
  address: z.string().trim().min(1, { message: "Required" }),
});

export type RestaurantValidatePayload = z.infer<typeof RestaurantSchema>;

type CreateRestaurantFormProps = {
  formData?: Restaurant | null;
  onRestaurantCreated: (restaurant: Restaurant) => void;
};

export default function CreateRestaurantForm(props: CreateRestaurantFormProps) {
  const { formData, onRestaurantCreated } = props;
  const { toast } = useToast();

  const form = useForm<RestaurantValidatePayload>({
    resolver: zodResolver(RestaurantSchema),
    defaultValues: {
      name: formData?.name || "",
      address: formData?.address || "",
    },
  });

  useEffect(() => {
    if (formData) {
      form.setValue("name", formData.name);
      form.setValue("address", formData.address);
    }
  }, [formData, form]);

  const onSubmit = async (values: z.infer<typeof RestaurantSchema>) => {
    const res = await CreateRestaurant(values);
    if (res.error) {
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        title: "Error from server",
        description: res.error,
        variant: "destructive",
      });
    } else {
      onRestaurantCreated(res.restaurant as Restaurant);
      form.reset();
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-green-500"
        ),
        title: "Success",
        description: "Restaurant created",
        variant: "default",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitBtn btnText="Add Restaurant" />
      </form>
    </Form>
  );
}
