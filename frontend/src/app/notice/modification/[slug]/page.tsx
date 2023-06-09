// import { getNoticeOne } from "@/function/database/mysql";
import { getNoticeOne } from "@/function/database/postgres";
import Modify from "../Modify";

export default async function ModifyPage({
  params,
}: {
  params: { slug: string };
}) {
  // 1. params.slug 번호로 DB에 검색해서 해당 엔티티 전부 가져오기.
  const content = await getNoticeOne(params.slug);
  
  return (
    <Modify content={content} postingNo={params.slug} />
  );
}
