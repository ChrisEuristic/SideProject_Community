import { RowDataPacket } from "mysql2";
import { Connection, createConnection } from "mysql2/promise";

export type Reply = {
  postingid: string;
  username: string;
  userid: string;
  content: string;
};

export async function getConnection() {
  return await createConnection({
    host:
      process.env.ENVIRONMENT === "production"
        ? process.env.DB_HOST_PRD
        : process.env.DB_HOST_DEV,
    port: 3306,
    user: process.env.DB_ID,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
  });
}

export async function killConnection(connection: Connection) {
  await connection.end();
}

export async function getNoticeOne(noticeId: string) {
  const connection = await getConnection();

  const [rows, field] = await connection.execute<RowDataPacket[]>(
    `SELECT * FROM NOTICE WHERE ID = '${noticeId}'`
  );

  killConnection(connection);

  return rows[0];
}

export async function getNoticeAll() {
  const connection = await getConnection();

  const [rows, field] = await connection.execute<RowDataPacket[]>(
    "SELECT * FROM NOTICE ORDER BY ID DESC LIMIT 10"
  );

  killConnection(connection);

  return rows;
}

export async function addNoticePosting(value: {
  title: string;
  content: string;
}) {
  const connection = await getConnection();
  await connection.execute<RowDataPacket[]>(
    "INSERT INTO NOTICE(`title`,`content`,`writer`) VALUES('" +
      value.title +
      "','" +
      value.content +
      "','admin')"
  );
  killConnection(connection);
}

export async function updateNoticePosting(value: {
  postingNo: string;
  title: string;
  content: string;
}) {
  const connection = await getConnection();
  await connection.execute<RowDataPacket[]>(
    `UPDATE NOTICE SET TITLE = "${value.title}", CONTENT = "${
      value.content
    }" WHERE ID = ${parseInt(value.postingNo)}`
  );

  killConnection(connection);
}

export async function deleteNoticePosting(noticeId: string) {
  const connection = await getConnection();

  try {
    await connection.execute<RowDataPacket[]>(
      `DELETE FROM REPLY WHERE POSTINGID = ${noticeId}`
    );
  } catch (e) {
    console.log("deleteNoticePosting SQL Error: 댓글 지우기 중 에러");
    console.error(e);
  }

  try {
    await connection.execute<RowDataPacket[]>(
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

  await connection.execute<RowDataPacket[]>(
    `UPDATE NOTICE SET VISIT = VISIT + 1 WHERE ID = ${postingNo}`
  );
  killConnection(connection);
}


// !! 댓글 기능

export async function getReply(postingid: string) {
  const connection = await getConnection();

  const [rows, field] = await connection.execute<RowDataPacket[]>(
    "SELECT * FROM REPLY WHERE POSTINGID=" + postingid + " ORDER BY ID ASC"
  );

  killConnection(connection);

  return rows;
}

export async function addReply(reply: Reply) {
  const connection = await getConnection();

  await connection.execute<RowDataPacket[]>(
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
    await connection.execute<RowDataPacket[]>(
      `DELETE FROM REPLY WHERE ID = ${replyID}`
    );
  } catch (e) {
    console.log("deleteNoticePosting SQL Error");
    console.error(e);
  }

  killConnection(connection);
}
