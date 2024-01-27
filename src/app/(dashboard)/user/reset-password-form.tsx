"use client";

import React, { useRef, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import CryptoJS from "crypto-js";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

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
import { SendRequest } from "@/_lib/utils";
import { updatePassword } from "@/app/actions/create-user";

enum PasswordErrorEnum {
  UPPER_CASE = "UPPER_CASE",
  LOWER_CASE = "LOWER_CASE",
  NUM = "NUM",
  MIN_LEN = "MIN_LEN",
  MAX_LEN = "MAX_LEN",
  SP_CHAR = "SP_CHAR",
}

const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Required")
      .min(6, PasswordErrorEnum.MIN_LEN)
      .max(12, PasswordErrorEnum.MAX_LEN)
      .refine((value) => /([0-9])/.test(value), PasswordErrorEnum.NUM)
      .refine((value) => /([a-z])/.test(value), PasswordErrorEnum.LOWER_CASE)
      .refine((value) => /([A-Z])/.test(value), PasswordErrorEnum.UPPER_CASE)
      .refine((value) => /(?=.*\W)/.test(value), PasswordErrorEnum.SP_CHAR),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

const PasswordErrorMessages = [
  {
    key: PasswordErrorEnum.LOWER_CASE,
    message: "Should contain at least one lowercase.",
  },
  {
    key: PasswordErrorEnum.UPPER_CASE,
    message: "Should contain at least one uppercase.",
  },
  {
    key: PasswordErrorEnum.MIN_LEN,
    message: "Should contain at least 6 characters.",
  },
  {
    key: PasswordErrorEnum.NUM,
    message: "Should contain at least one number.",
  },
  {
    key: PasswordErrorEnum.MAX_LEN,
    message: "Should contain at most 12 characters.",
  },
  {
    key: PasswordErrorEnum.SP_CHAR,
    message: "Should contain at least one special character.",
  },
];

export type ResetPasswordPayload = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordForm() {

  const { trigger, isMutating } = useSWRMutation(
    "/api/verify-password",
    SendRequest /* options */
  );

  const [currentPass, setCurrentPass] = useState("");
  const [isCurrentPassSubmitted, setIsCurrentPassSubmitted] = useState(false);
  const [isCurrentPassValid, setIsCurrentPassValid] = useState(false);
  const [passErrorMessages, setPassErrorMessages] = useState<string[]>([]);

  const form = useForm<ResetPasswordPayload>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    const cipherPass = CryptoJS.AES.encrypt(
      values.password.trim(),
      process.env.NEXTAUTH_SECRET!
    ).toString();

    const res = await updatePassword(cipherPass)
    console.log("🚀 ~ onSubmit ~ res:", res)
  };

  const onValidateClick = async () => {
    const cipherPass = CryptoJS.AES.encrypt(
      currentPass.trim(),
      process.env.NEXTAUTH_SECRET!
    ).toString();

    const result = await trigger({ pass: cipherPass } /* options */);
    setIsCurrentPassValid(result.passwordMatch);
    setIsCurrentPassSubmitted(true);
  };

  form.watch(async (e) => {
    const errorMessages: string[] = [];
    const result = await ResetPasswordSchema.safeParse(e);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        errorMessages.push(issue.message);
      });
      setPassErrorMessages(errorMessages);
    } else {
      setPassErrorMessages([]);
    }
  });

  return (
    <div>
      <div className="flex flex-row gap-5 mb-5">
        <Input
          type="text"
          placeholder="Enter Current Password"
          onChange={(e) => {
            setCurrentPass(e.target.value);
          }}
        />
        <Button
          variant="default"
          onClick={onValidateClick}
          disabled={!currentPass.trim()}
        >
          Validate
        </Button>
        {isCurrentPassSubmitted && isCurrentPassValid && (
          <CheckCircledIcon className="h-8 w-8 text-green-500" />
        )}
        {isCurrentPassSubmitted && !isCurrentPassValid && (
          <CrossCircledIcon className="h-8 w-8 text-destructive" />
        )}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-row gap-5"
        >
          <div className="flex flex-col gap-5 flex-grow">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isCurrentPassValid} />
                  </FormControl>
                  <FormDescription />
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-enter password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isCurrentPassValid} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitBtn
              btnText="Change password"
              isDisabled={!isCurrentPassValid}
            />
          </div>

          <div className="flex flex-col flex-[0_0_45%] gap-3 border border-slate-500 rounded-lg p-5">
            {PasswordErrorMessages.map((passwordErrorMessage, i) => {
              if (
                passErrorMessages.length === 0 &&
                !form.getFieldState("password").isDirty
              ) {
                return (
                  <ul key={`pass-error-messages-${i}`}>
                    <li className="text-sm">{passwordErrorMessage.message}</li>
                  </ul>
                );
              }
              const isValidationFailed = passErrorMessages.includes(
                passwordErrorMessage.key
              );
              return (
                <div key={`pass-error-messages-${i}`}>
                  <ul>
                    {!isValidationFailed && (
                      <li className="text-sm text-green-500">
                        {passwordErrorMessage.message}
                      </li>
                    )}
                    {isValidationFailed && (
                      <li className="text-sm text-destructive">
                        {passwordErrorMessage.message}
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </form>
      </Form>
    </div>
  );
}
