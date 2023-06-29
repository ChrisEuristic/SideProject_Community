import express from "express";
import {
  addLike,
  addNoticePosting,
  deleteNoticePosting,
  getIsLikeThis,
  getLikeCount,
  getNoticeAll,
  getNoticeOne,
  getReplyCount,
  incrementNoticeVisit,
  removeLike,
  updateNoticePosting,
  validAdmin,
} from "../function/mysql";
import { getPostingNo } from "../function/server";
import { Reply, addReply, getReply } from "../function/mysql";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Hello World!!! here is /api");
});

router.get("/admin", async (req, res) => {
  try {
    const account = req.query.email;
  
    if (await validAdmin(account as string)) {
      res.status(200).send("관리자입니다.");
    } else {
      res.status(202).send("관리자가 아닙니다.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error!");
  }
});

router.get("/thisnotice/:slug", async (req, res) => {
  const getTarget = getPostingNo(req.url);
  const content = await getNoticeOne(parseInt(getTarget));
  const { replyCount } = await getReplyCount(parseInt(getTarget));
  res.status(200).send(JSON.stringify([content, replyCount]));
});

router.get("/posting", async (req, res) => {
  const pageNo: string = req.url.split("?")[1].split("=")[1];
  const content = await getNoticeAll(pageNo);
  res.status(200).send(JSON.stringify(content));
});

router.post("/posting", async (req, res) => {
  addNoticePosting(req.body);
  res.status(201).send("공지사항 작성완료");
});

router.put("/posting", async (req, res) => {
  console.debug(req.body);
  updateNoticePosting(req.body);
  res.status(200).send("공지사항 수정완료");
});

router.get("/posting/:slug", async (req, res) => {
  const getTarget = getPostingNo(req.url);

  try {
    incrementNoticeVisit(parseInt(getTarget));
    const result = await getNoticeOne(parseInt(getTarget));
    res.status(200).send(JSON.stringify(result));
  } catch (error) {
    console.error("게시물 불러오는 중 에러", error);
    res.status(400).send("Error");
  }
});

router.delete("/posting/:slug", async (req, res) => {
  const deleteTarget = getPostingNo(req.url);

  try {
    await deleteNoticePosting(parseInt(deleteTarget));
    res.status(200).send("정상 삭제 완료");
  } catch (error) {
    console.error("/api/posting DELETE request Error");
    console.error(error);
    res.status(400).send("삭제 중 에러");
  }
});

router.get("/reply", async (req, res) => {
  const postingno = req.url.split("?")[1].split("=")[1] as string;

  const reply = await getReply(parseInt(postingno));

  res.status(200).send(JSON.stringify(reply));
});

router.post("/reply", async (req, res) => {
  const reply = req.body as Reply;
  addReply(reply);
  res.status(200).send("등록되었습니다.");
});

router.get("/replycount", async (req, res) => {
  const postingno = req.url.split("?")[1].split("=")[1] as string;

  const { replyCount } = await getReplyCount(parseInt(postingno));
  res.status(200).send(JSON.stringify(replyCount));
});

router.get("/likecount", async (req, res) => {
  const postingno = req.url.split("?")[1].split("=")[1] as string;

  const { likeCount } = await getLikeCount(parseInt(postingno));
  res.status(200).send(JSON.stringify(likeCount));
});

router.get("/islikethis", async (req, res) => {
  const splitText = req.url.split("?")[1].split(/[=&]/) as string[];
  const postingno = splitText[1];
  const userid = splitText[3];
  const isLikeThis = await getIsLikeThis(parseInt(postingno), userid);
  res.status(200).send(JSON.stringify(isLikeThis));
});

router.post("/islikethis", async (req, res) => {
  const postingno = req.body.postingno as string;
  const userid = req.body.userid as string;
  await addLike(parseInt(postingno), userid);
  res.status(201).send("Liked");
});

router.delete("/islikethis", async (req, res) => {
  const postingno = req.query.postingno as string;
  const userid = req.query.userid as string;
  await removeLike(parseInt(postingno), userid);
  res.status(200).send("UnLiked");
});

export default router;
