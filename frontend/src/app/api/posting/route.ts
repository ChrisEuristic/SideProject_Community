import { addNoticePosting, deleteNoticePosting, getNoticeOne } from "@/function/database/notice";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reader = request.body?.pipeThrough(new TextDecoderStream()).getReader();
  const inReader = await reader?.read();
  const { done, value } = inReader ?? { done: true, value: null };

  console.log(value);

  addNoticePosting(JSON.parse(value as string))
  return NextResponse.redirect(new URL("/notice", request.url));
}

export async function PUT(request: Request) {
  const reader = request.body?.pipeThrough(new TextDecoderStream()).getReader();
  const inReader = await reader?.read();
  const { done, value } = inReader ?? { done: true, value: null };
  const {no} = JSON.parse(value as string)
  // 게시물 번호를 서버로 보내서 게시물 내용 원본을 다시 받아오고,

  const content = await getNoticeOne(no);

  // addNoticePosting(JSON.parse(value as string))
  return NextResponse.json({
    content: content,
  });
}

export async function DELETE(request: Request) {
  const value = request.headers.get("no");
  await deleteNoticePosting(value as string);
}