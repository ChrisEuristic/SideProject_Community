import express from 'express';
import fs from "fs/promises";
import { addNoticePosting, deleteNoticePosting, getNoticeAll, getNoticeOne, incrementNoticeVisit, updateNoticePosting } from '../function/mysql';
import { getURLInform } from '../function/server';

const router = express.Router();

router.get("/", async (req, res) => {
  const pageNo: string = (req.url.split("?")[1]).split("=")[1];
  const content = await getNoticeAll(pageNo);
  //!: 체크
  console.log(JSON.stringify(content));
  return new Response(JSON.stringify(content), {
    status: 200,
  })
})
router.post("/", async (req, res) => {
  const reader = req.body?.pipeThrough(new TextDecoderStream()).getReader();
  const inReader = await reader?.read();
  const { done, value } = inReader ?? { done: true, value: null };

  
  addNoticePosting(JSON.parse(value as string));
  return new Response("공지사항 작성완료", {
    status: 200,
  })
})
router.put("/", async (req, res) => {
  const reader = req.body?.pipeThrough(new TextDecoderStream()).getReader();
  const inReader = await reader?.read();
  const { done, value } = inReader ?? { done: true, value: null };
  

  updateNoticePosting(JSON.parse(value as string));
  
  return new Response("공지사항 수정완료", {
    status: 200,
  })
})

router.get("/:slug", async (req, res) => {
  const getTarget = getURLInform(req.url).postingNo;

  try {
    incrementNoticeVisit(getTarget);
    const result = await getNoticeOne(getTarget as string);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("게시물 불러오는 중 에러", error);
    return new Response("error", { status: 400 });
  }
})
router.delete("/:slug", async (req, res) => {
  const deleteTarget = getURLInform(req.url).postingNo;

  try {
    await deleteNoticePosting(deleteTarget as string);
    return new Response("정상 삭제 완료", {status: 200})
  } catch (error) {
    console.error("/api/posting DELETE request Error");
    console.error(error);
    return new Response("정상 삭제 완료", {status: 400})

  }
})

export default router;