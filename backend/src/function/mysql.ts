import { RowDataPacket } from "mysql2";
import { Connection, createConnection } from "mysql2/promise";
import dotenv from "dotenv";

export type Reply = {
  postingid: string;
  username: string;
  userid: string;
  content: string;
};

export async function getConnection() {
  dotenv.config();

  return await createConnection({
    host: "localhost",
    port: 3306,
    user: "Accesser",
    password: "Asdaz080808!",
    database: "whoami",
  });
}



export async function killConnection(connection: Connection) {
  await connection.end();
}

export async function getNoticeOne(noticeId: string) {
  const connection = await getConnection();

  const [rows, field] = await connection.query<RowDataPacket[]>(
    `SELECT * FROM NOTICE WHERE ID = '${noticeId}'`
  );

  killConnection(connection);

  return rows[0];
}

export async function getNoticeAll(pageNo: string) {
  const connection = await getConnection();
  
  const [count, field1] = await connection.query<RowDataPacket[]>(
    "SELECT COUNT(*) as postingQty FROM NOTICE"
  );
  
  const [rows, field2] = await connection.query<RowDataPacket[]>(
    "SELECT * FROM NOTICE ORDER BY ID DESC LIMIT 10 OFFSET " + (parseInt(pageNo) - 1) * 10
  );
  killConnection(connection)
  return [count[0].postingQty, rows];
}

export async function addNoticePosting(value: {
  account: string;
  title: string;
  content: string;
}) {
  const connection = await getConnection();

  const nickname = await connection.query<RowDataPacket[]>(
    "SELECT NICKNAME FROM ADMIN WHERE ACCOUNT='" + value.account + "'"
  );

  const parsingNickname = JSON.parse(JSON.stringify(nickname))[0][0]

  await connection.query<RowDataPacket[]>(
    "INSERT INTO NOTICE(`title`,`content`,`writer`) VALUES('" +
      value.title +
      "','" +
      value.content +
      "','" +
      parsingNickname['NICKNAME'] +
      // value.account +
      "')"
  );
  killConnection(connection);
}

export async function updateNoticePosting(value: {
  postingNo: string;
  title: string;
  content: string;
}) {
  const connection = await getConnection();
  await connection.query<RowDataPacket[]>(
    `UPDATE NOTICE SET TITLE = "${value.title}", CONTENT = "${
      value.content
    }" WHERE ID = ${parseInt(value.postingNo)}`
  );

  killConnection(connection);
}

export async function deleteNoticePosting(noticeId: string) {
  const connection = await getConnection();

  try {
    await connection.query<RowDataPacket[]>(
      `DELETE FROM REPLY WHERE POSTINGID = ${noticeId}`
    );
  } catch (e) {
    console.log("deleteNoticePosting SQL Error: 댓글 지우기 중 에러");
    console.error(e);
  }

  try {
    await connection.query<RowDataPacket[]>(
      `DELETE FROM NOTICE WHERE ID = ${noticeId}`
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
export async function incrementNoticeVisit(postingNo: string) {
  const connection = await getConnection();

  await connection.query<RowDataPacket[]>(
    `UPDATE NOTICE SET VISIT = VISIT + 1 WHERE ID = ${postingNo}`
  );
  killConnection(connection);
}


// !! 댓글 기능

export async function getReply(postingid: string) {
  const connection = await getConnection();

  const [rows, field] = await connection.query<RowDataPacket[]>(
    "SELECT * FROM REPLY WHERE POSTINGID=" + postingid + " ORDER BY ID ASC"
  );

  killConnection(connection);

  return rows;
}

export async function getReplyCount(postingid: string) {
  const connection = await getConnection();

  const [rows, field] = await connection.query<RowDataPacket[]>(
    "SELECT COUNT(*) as replyCount FROM REPLY WHERE POSTINGID=" + postingid
  );

  killConnection(connection);

  return rows[0];
}

export async function addReply(reply: Reply) {
  const connection = await getConnection();

  await connection.query<RowDataPacket[]>(
    "INSERT INTO REPLY(`postingid`,`username`,`userid`,`content`) VALUES(" +
      reply.postingid +
      ",'" +
      reply.username +
      "','" +
      reply.userid +
      "','" +
      reply.content +
      "')"
  );

  killConnection(connection);
}

export async function deleteReply(replyID: string) {
  const connection = await getConnection();

  try {
    await connection.query<RowDataPacket[]>(
      `DELETE FROM REPLY WHERE ID = ${replyID}`
    );
  } catch (e) {
    console.log("deleteNoticePosting SQL Error");
    console.error(e);
  }

  killConnection(connection);
}


// !! 좋아요 기능

export async function getLikeCount(postingid: string) {
  const connection = await getConnection();

  const [rows, field] = await connection.query<RowDataPacket[]>(
    "SELECT COUNT(*) as likeCount FROM notice_like WHERE POSTINGID=" + postingid
  );

  killConnection(connection);

  return rows[0];
}

export async function getIsLikeThis(postingid: string, userid: string) {
  const connection = await getConnection();

  const [rows, field] = await connection.query<RowDataPacket[]>(
    `SELECT * FROM notice_like WHERE ID=${postingid} AND memberid='${userid}'`
  );

  killConnection(connection);

  return rows[0];
}

export async function addLike(postingid: string, userid: string) {
  const connection = await getConnection();

  await connection.query<RowDataPacket[]>(
    "INSERT INTO notice_like(`postingid`,`memberid`) VALUES(" +
      postingid +
      ",'" +
      userid +
      "')"
  );

  killConnection(connection);
}

export async function removeLike(postingid: string, userid: string) {
  const connection = await getConnection();

  try {
    await connection.query<RowDataPacket[]>(
      `DELETE FROM notice_like WHERE postingid = ${postingid} and memberid = '${userid}'`
    );
  } catch (e) {
    console.log("deleteNoticePosting SQL Error");
    console.error(e);
  }

  killConnection(connection);
}


// !: 어드민 계정 검증

export async function validAdmin(account: string){
  console.debug("2번 지점");
  const connection = await getConnection();
  console.debug("3번 지점");
  const [rows, field] = await connection.execute<RowDataPacket[]>(
    "SELECT * FROM admin WHERE account=?", [account]
    );
    console.debug("4번 지점");
  killConnection(connection);
  return rows[0] ? true : false;
}
