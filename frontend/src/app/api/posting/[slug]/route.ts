import { deleteNoticePosting, getNoticeOne, incrementNoticeVisit } from "@/function/database/notice";
import { getURLInform } from "@/function/util/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const getTarget = getURLInform(request.url).postingNo;

  try {
    incrementNoticeVisit(getTarget);
    const result = await getNoticeOne(getTarget as string);
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("게시물 불러오는 중 에러", error);
    return new NextResponse("error", { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const deleteTarget = getURLInform(request.url).postingNo;

  try {
    await deleteNoticePosting(deleteTarget as string);
  } catch (error) {
    console.error("/api/posting DELETE request Error");
    console.error(error);
  }
}
