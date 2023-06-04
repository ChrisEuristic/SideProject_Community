'use client'

import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  
  // myFunction();

  return (
    <>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        대시보드
      </main>
    </>
  );
}


async function myFunction() {
	const csrfToken = await getCsrfToken();
	console.log(csrfToken);
}

