import {
  addNoticePosting,
  deleteNoticePosting,
  getNoticeOne,
  updateNoticePosting,
} from "@/function/database/notice";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reader = request.body?.pipeThrough(new TextDecoderStream()).getReader();
  const inReader = await reader?.read();
  const { done, value } = inReader ?? { done: true, value: null };

  console.log(value);

  addNoticePosting(JSON.parse(value as string));
  return NextResponse.redirect(new URL("/notice", request.url));
}

export async function PUT(request: Request) {
  const reader = request.body?.pipeThrough(new TextDecoderStream()).getReader();
  const inReader = await reader?.read();
  const { done, value } = inReader ?? { done: true, value: null };

  updateNoticePosting(JSON.parse(value as string))

  return NextResponse.redirect(new URL("/notice", request.url));
}

export async function DELETE(request: Request) {
  const value = request.headers.get("no");

  try {
    await deleteNoticePosting(value as string);
  } catch (error) {
    console.log("/api/posting DELETE request Error");
    console.error(error);
  }
}
