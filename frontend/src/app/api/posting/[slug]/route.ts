import { deleteNoticePosting } from "@/function/database/notice";
import { getURLInform } from "@/function/util/server";

export async function DELETE(request: Request) {

  const deleteTarget = getURLInform(request.url).postingNo;

  try {
    await deleteNoticePosting(deleteTarget as string);
  } catch (error) {
    console.log("/api/posting DELETE request Error");
    console.error(error);
  }
}