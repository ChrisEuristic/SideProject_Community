'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function DeletePage(){
  const router = useRouter();
  const searchParams = useSearchParams().get("no");
  useEffect(() => {
    fetch(`https://www.eurekasolusion.shop/api/posting/${searchParams}`, {
      method: "DELETE",
    }).then((res) => {
      router.push("/notice");
      router.refresh();
    })
    .catch((error) => {
      console.error(error);
      console.error("delete Page error!");
    })
  },[searchParams, router]);
  
}