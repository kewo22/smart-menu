import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Dashboard() {
  const session = await getServerSession();
  console.log("🚀 ~ Page ~ session:", session)

  if(!session || !session.user){
    redirect('/login')
  }

  return (
    <div>
      Dashboard
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
