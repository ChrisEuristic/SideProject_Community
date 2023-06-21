import express from "express";
import { Reply, addReply, getReply } from "../function/mysql";

const router = express.Router();

router.get("/", async (req, res) => {
  const postingno = req.url.split("?")[1].split("=")[1] as string;

  const reply = await getReply(postingno);

  return new Response(JSON.stringify(reply), {
    status: 200,
  });
});
router.post("/", async (req, res) => {
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
