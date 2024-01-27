import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/_lib/auth-options";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import ResetPasswordForm from "./reset-password-form";

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log("🚀 ~ Page ~ session:", session);

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-10 h-full overflow-hidden">
      <h1 className="text-2xl">User Management</h1>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <div className="flex flex-row gap-16 bg-slate-100 h-fit p-10 rounded-lg w-fit drop-shadow-lg">
        <div>
          <span className="block">Name</span>
          <span className="font-bold capitalize">
            {(session.user as any).firstName} &nbsp;
            {(session.user as any).lastName}
          </span>
        </div>
        <div>
          <span className="block">Username</span>
          <span className="font-bold">{(session.user as any).userName}</span>
        </div>
        <div>
          <span className="block">Email</span>
          <span className="font-bold">
            {(session.user as any).email}
          </span>
        </div>
        <div>
          <span className="block">Contact Number</span>
          <span className="font-bold capitalize">
            {(session.user as any).contactNo}
          </span>
        </div>
      </div>

      <div className="bg-slate-100 h-fit p-10 rounded-lg w-fit drop-shadow-lg flex flex-col gap-5 min-w-[783px]">
        <span className="block font-bold">Email</span>
        {!(session.user as any).emailVerified && (
          <div className="flex flex-row justify-between items-center gap-5">
            <span className="block">Email Not Verified</span>
            <Button variant="default">Sent verification email</Button>
          </div>
        )}
        {(session.user as any).emailVerified && (
          <div className="flex flex-row items-center justify-between gap-5">
            <span className="block">Email Verified</span> &nbsp;
            <CheckCircledIcon className="h-8 w-8 text-green-500" />
          </div>
        )}
      </div>

      <div>
        <div className="bg-slate-100 h-fit p-10 rounded-lg w-fit drop-shadow-lg flex flex-col gap-5 min-w-[783px]">
          <div>
            <span className="block font-bold">Reset Password</span>
            <span className="block">
              Validate current password to change password
            </span>
          </div>
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
