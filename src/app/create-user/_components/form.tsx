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

const CreateUserSchema = z.object({
  firstName: z.string().trim().min(1, { message: "Required" }),
  lastName: z.string().trim().min(1, { message: "Required" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .email({ message: "Invalid email address" }),
  contactNo: z.string().trim().min(1, { message: "Required" }),
  userName: z.string().trim().min(1, { message: "Required" }),
});

export type CreateUserValidatePayload = z.infer<typeof CreateUserSchema>;

const x = (count: number) => Math.floor(Math.random() * count);

export default function CreateUserForm() {
  const { toast } = useToast();

  const form = useForm<CreateUserValidatePayload>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactNo: "",
      userName: "",
    },
  });

  const onEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const spited = e.target.value.split("@")[0];
    form.setValue("userName", spited, { shouldValidate: true });
    form.clearErrors("userName");
  };

  const onSubmit = async (values: z.infer<typeof CreateUserSchema>) => {
    const res = await createUser(values);
    console.log("🚀 ~ onSubmit ~ res:", res)
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
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
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} onBlur={onEmailBlur} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact No</FormLabel>
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
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input readOnly={true} {...field} />
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
