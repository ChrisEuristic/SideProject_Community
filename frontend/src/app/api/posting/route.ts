import { addNoticePosting } from "@/function/database/notice";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reader = request.body?.pipeThrough(new TextDecoderStream()).getReader();
  const inReader = await reader?.read();
  const { done, value } = inReader ?? { done: true, value: null };

  console.log(value);

  addNoticePosting(JSON.parse(value as string))
  return NextResponse.redirect(new URL("/notice", request.url));
}