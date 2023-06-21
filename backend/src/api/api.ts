import express from 'express';
import { addNoticePosting, deleteNoticePosting, getNoticeAll, getNoticeOne, incrementNoticeVisit, updateNoticePosting, validAdmin } from '../function/mysql';
import { getPostingNo } from '../function/server';
import { Reply, addReply, getReply } from "../function/mysql";

const router = express.Router();

router.get("/admin", async (req, res) => {
  const account = (req.url.split("?")[1]).split("=")[1];

  if(await validAdmin(account)){
    res.status(200).send("관리자입니다.");
  } else {
    res.status(202).send("관리자가 아닙니다.");
  }
})

router.get("/thisnotice/:slug", async (req, res) => {
  const getTarget = getPostingNo(req.url);
  const content = await getNoticeOne(getTarget);
  res.status(200).send(JSON.stringify(content));
})

router.get("/posting", async (req, res) => {
  const pageNo: string = (req.url.split("?")[1]).split("=")[1];
  const content = await getNoticeAll(pageNo);
  res.status(200).send(JSON.stringify(content));
})

router.post("/posting", async (req, res) => {
  addNoticePosting(req.body);
  res.status(201).send("공지사항 작성완료");
})

router.put("/posting", async (req, res) => {
  updateNoticePosting(req.body);
  res.status(200).send("공지사항 수정완료");
})

router.get("/posting/:slug", async (req, res) => {
  const getTarget = getPostingNo(req.url);

  try {
    incrementNoticeVisit(getTarget);
    const result = await getNoticeOne(getTarget as string);
    res.status(200).send(JSON.stringify(result))
  } catch (error) {
    console.error("게시물 불러오는 중 에러", error);
    res.status(400).send("Error")
  }
})

router.delete("/posting/:slug", async (req, res) => {
  const deleteTarget = getPostingNo(req.url);

  try {
    await deleteNoticePosting(deleteTarget as string);
    res.status(200).send("정상 삭제 완료")
  } catch (error) {
    console.error("/api/posting DELETE request Error");
    console.error(error);
    res.status(400).send("삭제 중 에러")
  }
})

router.get("/reply", async (req, res) => {
  const postingno = req.url.split("?")[1].split("=")[1] as string;

  const reply = await getReply(postingno);

  res.status(200).send(JSON.stringify(reply));
});

router.post("/reply", async (req, res) => {
  console.log("**********");
  console.log(req.body);
  console.log("**********");
  const reply = req.body as Reply;
  console.debug(`
  ========== 새로운 댓글 ==========
  ${reply.postingid}번 게시글에 대한 댓글
  ${reply.username} [${reply.userid}]
  ${reply.content}
  `);
  addReply(reply);

  res.status(200).send("등록되었습니다.");
});

export default router;