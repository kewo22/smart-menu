import React from "react";

import Form from "./_components/form";

export default function Page() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-2xl">Manage Restaurant</h1>
      <div className="max-w-3xl">
        <Form />
      </div>
    </div>
  );
}
