import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();

  if(!session || !session.user){
    redirect('/login')
  }

  return (
    <div>
      Menu
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
