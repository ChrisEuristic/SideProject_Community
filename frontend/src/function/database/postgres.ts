import { db } from "@vercel/postgres";

export type Reply = {
  postingid: string;
  username: string;
  userid: string;
  content: string;
};

export async function getConnection() {
  return await db.connect();
}

export async function getNoticeOne(noticeId: string) {
  const connection = await getConnection();

  try {
    const result =
      await connection.sql`SELECT * FROM NOTICE WHERE ID = ${noticeId};`;
      return result.rows[0];
  } catch (error) {
    console.log("error >> ", error);
  }

}

export async function getNoticeAll(pageNo: string) {
  const connection = await getConnection();

  const result =
    await connection.sql`SELECT * FROM NOTICE ORDER BY ID DESC LIMIT 10 OFFSET ${
      (parseInt(pageNo) - 1) * 10
    };`;


  return [result.rowCount, result.rows];
}

export async function addNoticePosting(value: {
  account: string;
  title: string;
  content: string;
}) {
  const connection = await getConnection();
  const nickname =
    await connection.sql`SELECT NICKNAME FROM ADMIN WHERE ACCOUNT=${value.account}`;
  const parsingNickname = JSON.parse(JSON.stringify(nickname.rows[0]["nickname"]));
  await connection.sql`INSERT INTO NOTICE(title, content, writer) VALUES(${value.title}, ${value.content}, ${parsingNickname})`;
}

export async function updateNoticePosting(value: {
  postingNo: string;
  title: string;
  content: string;
}) {
  const connection = await getConnection();
  await connection.sql`UPDATE NOTICE SET TITLE = ${value.title}, CONTENT = ${
    value.content
  } WHERE ID = ${parseInt(value.postingNo)}`;
}

export async function deleteNoticePosting(noticeId: string) {
  const connection = await getConnection();

  try {
    await connection.sql`DELETE FROM REPLY WHERE POSTINGID = ${noticeId}`;
  } catch (e) {
    console.log("deleteNoticePosting SQL Error: 댓글 지우기 중 에러");
    console.error(e);
  }

  try {
    await connection.sql`DELETE FROM NOTICE WHERE ID = ${noticeId}`;
  } catch (e) {
    console.log("deleteNoticePosting SQL Error: 본문 지우기 중 에러");
    console.error(e);
  }
}

// !! 조회수, 좋아요 기능

/**
 * 조회수 1 증가
 * @param postingNo 게시물 번호
 */
export async function incrementNoticeVisit(postingNo: string) {
  const connection = await getConnection();
  await connection.sql`UPDATE NOTICE SET VISIT = VISIT + 1 WHERE ID = ${postingNo}`;
}

// !! 댓글 기능

export async function getReply(postingid: string) {
  const connection = await getConnection();

  const result =
    await connection.sql`SELECT * FROM REPLY WHERE POSTINGID=${postingid} ORDER BY ID ASC`;

  return result.rows;
}

export async function addReply(reply: Reply) {
  const connection = await getConnection();
  await connection.sql`INSERT INTO REPLY(postingid, username, userid, content) VALUES(${reply.postingid}, ${reply.username}, ${reply.userid}, ${reply.content})`;
}

export async function deleteReply(replyID: string) {
  const connection = await getConnection();

  try {
    await connection.sql`DELETE FROM REPLY WHERE ID = ${replyID}`;
  } catch (e) {
    console.log("deleteNoticePosting SQL Error");
    console.error(e);
  }
}
