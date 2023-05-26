'use client';
import { useRouter } from "next/navigation";

export default function Error () {
  useRouter().push("/");
  return (
    <></>
  );
}