'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function DeletePage(){
  const router = useRouter();
  const searchParams = useSearchParams().get("no");
  useEffect(() => {
    fetch("/api/posting", {
      method: "DELETE",
      headers: {
        no: searchParams as string
      }
    }).then((res) => {
      router.push("/notice");
      router.refresh();
    })
    .catch((error) => {
      console.log("delete Page error!");
    })
  },[searchParams, router]);
  
}