import {
  addNoticePosting,
  updateNoticePosting,
} from "@/function/database/notice";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reader = request.body?.pipeThrough(new TextDecoderStream()).getReader();
  const inReader = await reader?.read();
  const { done, value } = inReader ?? { done: true, value: null };

  console.log("작성된 게시글 >> ", value);

  addNoticePosting(JSON.parse(value as string));
  return new NextResponse("공지사항 작성완료", {
    status: 200,
  })
}

export async function PUT(request: Request) {
  const reader = request.body?.pipeThrough(new TextDecoderStream()).getReader();
  const inReader = await reader?.read();
  const { done, value } = inReader ?? { done: true, value: null };

  updateNoticePosting(JSON.parse(value as string));

  return new NextResponse("공지사항 수정완료", {
    status: 200,
  })
}
