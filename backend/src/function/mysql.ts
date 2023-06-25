import { RowDataPacket } from "mysql2";
import { Connection, createConnection } from "mysql2/promise";
import dotenv from "dotenv";

export type Reply = {
  postingid: number;
  username: string;
  userid: string;
  content: string;
};

export async function getConnection() {
  dotenv.config();

  return await createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DB_ID,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
  });
}



export async function killConnection(connection: Connection) {
  await connection.end();
}

export async function getNoticeOne(noticeId: number) {
  const connection = await getConnection();

  const [rows, field] = await connection.query<RowDataPacket[]>(
    "SELECT * FROM notice WHERE id = ?", [noticeId]
  );

  killConnection(connection);

  return rows[0];
}

export async function getNoticeAll(pageNo: string) {
  try {
    const connection = await getConnection();
    
    const [count, field1] = await connection.query<RowDataPacket[]>(
      "SELECT COUNT(*) as postingQty FROM notice"
    );
    
    const [rows, field2] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM notice ORDER BY id DESC LIMIT 10 OFFSET ?", [(parseInt(pageNo) - 1) * 10]
    );
    killConnection(connection)
    return [count[0].postingQty, rows];
  } catch (error) {
    console.error("Debug Point! >> ", error);
    return [-1, []];
  }
}

export async function addNoticePosting(value: {
  account: string;
  title: string;
  content: string;
}) {
  try {
    const connection = await getConnection();
  
    const nickname = await connection.query<RowDataPacket[]>(
      "SELECT nickname FROM admin WHERE account=?", [value.account]
    );
  
    const parsingNickname = JSON.parse(JSON.stringify(nickname))[0][0]
  
    await connection.query<RowDataPacket[]>(
      "INSERT INTO notice(`title`,`content`,`writer`) VALUES(?, ?, ?)", [value.title, value.content, parsingNickname['nickname']]
    );
    killConnection(connection);
  } catch (error) {
    console.error("Debug Point! >> ", error);
  }
}

export async function updateNoticePosting(value: {
  postingNo: number;
  title: string;
  content: string;
}) {
  const connection = await getConnection();
  await connection.query<RowDataPacket[]>(
    "UPDATE notice SET title = ?, content = ? WHERE id = ?", [value.title, value.content, value.postingNo]
  );

  killConnection(connection);
}

export async function deleteNoticePosting(noticeId: number) {
  const connection = await getConnection();

  try {
    await connection.query<RowDataPacket[]>(
      "DELETE FROM reply WHERE postingid = ?", [noticeId]
    );
  } catch (e) {
    console.log("deleteNoticePosting SQL Error: 댓글 지우기 중 에러");
    console.error(e);
  }

  try {
    await connection.query<RowDataPacket[]>(
      "DELETE FROM notice WHERE id = ?", [noticeId]
    );
  } catch (e) {
    console.log("deleteNoticePosting SQL Error: 본문 지우기 중 에러");
    console.error(e);
  }

  killConnection(connection);
}


// !! 조회수, 좋아요 기능

/**
 * 조회수 1 증가
 * @param postingNo 게시물 번호
 */
export async function incrementNoticeVisit(postingNo: number) {
  const connection = await getConnection();

  await connection.query<RowDataPacket[]>(
    "UPDATE notice SET visit = visit + 1 WHERE id = ?", [postingNo]
  );
  killConnection(connection);
}


// !! 댓글 기능

export async function getReply(postingid: number) {
  const connection = await getConnection();

  const [rows, field] = await connection.query<RowDataPacket[]>(
    "SELECT * FROM reply WHERE postingid=? ORDER BY id ASC", [postingid]
  );

  killConnection(connection);

  return rows;
}

export async function getReplyCount(postingid: number) {
  const connection = await getConnection();

  const [rows, field] = await connection.query<RowDataPacket[]>(
    "SELECT COUNT(*) as replyCount FROM reply WHERE postingid=?", [postingid]
  );

  killConnection(connection);

  return rows[0];
}

export async function addReply(reply: Reply) {
  const connection = await getConnection();

  await connection.query<RowDataPacket[]>(
    "INSERT INTO reply(`postingid`,`username`,`userid`,`content`) VALUES(?, ?, ?, ?)", [reply.postingid, reply.username, reply.userid, reply.content]
  );

  killConnection(connection);
}

export async function deleteReply(replyID: number) {
  const connection = await getConnection();

  try {
    await connection.query<RowDataPacket[]>(
      "DELETE FROM reply WHERE id = ?", [replyID]
    );
  } catch (e) {
    console.log("deleteNoticePosting SQL Error");
    console.error(e);
  }

  killConnection(connection);
}


// !! 좋아요 기능

export async function getLikeCount(postingid: number) {
  const connection = await getConnection();

  const [rows, field] = await connection.query<RowDataPacket[]>(
    "SELECT COUNT(*) as likeCount FROM notice_like WHERE postingid=?", [postingid]
  );

  killConnection(connection);

  return rows[0];
}

export async function getIsLikeThis(postingid: number, userid: string) {
  const connection = await getConnection();

  console.debug("getIsLikeThis func check >> mysql.ts 207");
  console.debug(postingid, typeof postingid);
  console.debug(userid, typeof userid);

  const [rows, field] = await connection.query<RowDataPacket[]>(
    "SELECT * FROM notice_like WHERE id=? AND memberid=?", [postingid, userid]
  );

  killConnection(connection);

  return rows[0];
}

export async function addLike(postingid: number, userid: string) {
  const connection = await getConnection();

  await connection.query<RowDataPacket[]>(
    "INSERT INTO notice_like(`postingid`,`memberid`) VALUES(?, ?)", [postingid, userid]
  );

  killConnection(connection);
}

export async function removeLike(postingid: number, userid: string) {
  const connection = await getConnection();

  try {
    await connection.query<RowDataPacket[]>(
      "DELETE FROM notice_like WHERE postingid = ? and memberid = ?", [postingid, userid]
    );
  } catch (e) {
    console.log("deleteNoticePosting SQL Error");
    console.error(e);
  }

  killConnection(connection);
}


// !: 어드민 계정 검증

export async function validAdmin(account: string){
  const connection = await getConnection();
  const [rows, field] = await connection.query<RowDataPacket[]>(
    "SELECT * FROM admin WHERE account=?", [account]
    );
  killConnection(connection);
  return rows[0] ? true : false;
}
