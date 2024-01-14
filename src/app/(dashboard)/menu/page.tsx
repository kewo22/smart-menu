// "use client";
// import { useSession } from "next-auth/react";
// import React from "react";

// export default function Page() {
//   const { data: session } = useSession();

//   return (
//     <div>
//       MENU <br /> <pre>{JSON.stringify(session, null, 2)}</pre>
//     </div>
//   );
// }


import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  console.log("🚀 ~ Page ~ session:", session)

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
