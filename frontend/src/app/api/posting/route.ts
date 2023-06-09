// import {
//   addNoticePosting,
//   getNoticeAll,
//   updateNoticePosting,
// } from "@/function/database/mysql";
// import { RowDataPacket } from "mysql2";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const pageNo: string = (request.url.split("?")[1]).split("=")[1];
//   const content: RowDataPacket[][] = await getNoticeAll(pageNo);
//   return new NextResponse(JSON.stringify(content), {
//     status: 200,
//   })
// }

// export async function POST(request: Request) {
//   const reader = request.body?.pipeThrough(new TextDecoderStream()).getReader();
//   const inReader = await reader?.read();
//   const { done, value } = inReader ?? { done: true, value: null };

  
//   addNoticePosting(JSON.parse(value as string));
//   return new NextResponse("공지사항 작성완료", {
//     status: 200,
//   })
// }

// export async function PUT(request: Request) {
//   const reader = request.body?.pipeThrough(new TextDecoderStream()).getReader();
//   const inReader = await reader?.read();
//   const { done, value } = inReader ?? { done: true, value: null };
  

//   updateNoticePosting(JSON.parse(value as string));
  
//   return new NextResponse("공지사항 수정완료", {
//     status: 200,
//   })
// }

import { addNoticePosting, getNoticeAll, updateNoticePosting } from "@/function/database/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const pageNo: string = (request.url.split("?")[1]).split("=")[1];
  const content = await getNoticeAll(pageNo);
  //!: 체크
  console.log(JSON.stringify(content));
  return new NextResponse(JSON.stringify(content), {
    status: 200,
  })
}

export async function POST(request: Request) {
  const reader = request.body?.pipeThrough(new TextDecoderStream()).getReader();
  const inReader = await reader?.read();
  const { done, value } = inReader ?? { done: true, value: null };

  
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
