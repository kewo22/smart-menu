import React from "react";
import CreateUserForm from "./_components/form";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-2/5">
        <CreateUserForm />
      </div>
    </div>
  );
}
