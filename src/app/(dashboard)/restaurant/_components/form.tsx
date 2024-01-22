"use client";
import React from "react";
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
import createUser from "@/app/actions/create-user";
import * as z from "zod";

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

const x = (count: number) => Math.floor(Math.random() * count);

export default function CreateRestaurantForm() {
  const { toast } = useToast();

  const form = useForm<RestaurantValidatePayload>({
    resolver: zodResolver(RestaurantSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RestaurantSchema>) => {
    const res = await CreateRestaurant(values);
    console.log("🚀 ~ onSubmit ~ res:", res);
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
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-green-500"
        ),
        title: "Success",
        description: "User created",
        variant: "default",
      });
    }
  };
  //   const r = x(2);
  //   if (r === 1) throw new Error("wqdwqdwqd");

  return (
    <Form {...form}>
      <form
        // action={createUserClientAction}
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
        <SubmitBtn />
      </form>
    </Form>
  );
}
