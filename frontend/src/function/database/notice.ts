import { RowDataPacket } from "mysql2";
import { Connection, createConnection } from "mysql2/promise";

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
