'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function DeletePage(){
  const router = useRouter();
  const searchParams = useSearchParams().get("no");
  useEffect(() => {
    fetch(`/api/posting/${searchParams}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
    },
    }).then((res) => {
      // goto("/notice")
      router.push("/notice");
    })
    .catch((error) => {
      console.error(error);
      console.log("delete Page error!");
    })
  },[searchParams, router]);
  
}