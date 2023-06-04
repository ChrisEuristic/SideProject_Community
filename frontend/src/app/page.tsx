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
        <div>
          {JSON.stringify(session?.user)}
          <button onClick={() => signIn("kakao")}>Sign in</button>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </main>
    </>
  );
}


async function myFunction() {
	const csrfToken = await getCsrfToken();
	console.log(csrfToken);
}

