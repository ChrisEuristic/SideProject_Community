import express from 'express';
import { addNoticePosting, deleteNoticePosting, getNoticeAll, getNoticeOne, incrementNoticeVisit, updateNoticePosting } from '../function/mysql';
import { getURLInform } from '../function/server';
import { Reply, addReply, getReply } from "../function/mysql";

const router = express.Router();

router.get("/posting", async (req, res) => {
  const pageNo: string = (req.url.split("?")[1]).split("=")[1];
  const content = await getNoticeAll(pageNo);
  res.status(200).send(JSON.stringify(content));
})
router.post("/posting", async (req, res) => {
  // const reader = req.body?.pipeThrough(new TextDecoderStream()).getReader();
  // const inReader = await reader?.read();
  // const { done, value } = inReader ?? { done: true, value: null };

  console.log(req.body);

  
  // addNoticePosting(JSON.parse(value as string));
  res.status(201).send("공지사항 작성완료");
})
router.put("/posting", async (req, res) => {
  const reader = req.body?.pipeThrough(new TextDecoderStream()).getReader();
  const inReader = await reader?.read();
  const { done, value } = inReader ?? { done: true, value: null };
  

  updateNoticePosting(JSON.parse(value as string));
  res.status(200).send("공지사항 수정완료");
})

router.get("/posting/:slug", async (req, res) => {
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
router.delete("/posting/:slug", async (req, res) => {
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

router.get("/reply", async (req, res) => {
  const postingno = req.url.split("?")[1].split("=")[1] as string;

  const reply = await getReply(postingno);

  return new Response(JSON.stringify(reply), {
    status: 200,
  });
});
router.post("/reply", async (req, res) => {
  const reader = req.body?.pipeThrough(new TextDecoderStream()).getReader();
  const inReader = await reader?.read();
  const { done, value } = inReader ?? { done: true, value: null };

  const reply = JSON.parse(value as string) as Reply;

  console.debug(`
  ========== 새로운 댓글 ==========
  ${reply.postingid}번 게시글에 대한 댓글
  ${reply.username} [${reply.userid}]
  ${reply.content}
  `);
  addReply(reply);

  return new Response("등록되었습니다.", {
    status: 200,
  });
});

export default router;