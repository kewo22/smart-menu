"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { SubmitBtn } from "@/app/_components/SubmitBtn";
import { Button } from "@/components/ui/button";

const ResetPasswordSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
});

export type ResetPasswordPayload = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordForm() {
  const form = useForm<ResetPasswordPayload>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    disabled: true,
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
  };

  return (
    <div>
      <div className="flex flex-row gap-5 mb-5">
        <Input type="text" placeholder="Enter Current Password" />
        <Button variant="default">Validate</Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re enter password</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitBtn btnText="Change password" />
        </form>
      </Form>
    </div>
  );
}
