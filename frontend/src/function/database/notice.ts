/* notice.test.ts 통과 */

import { RowDataPacket } from "mysql2";
import { Connection, createConnection } from "mysql2/promise";

export async function getConnection() {
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

// export async function getNoticeQuery(){}

export async function getNoticeAll(){
  const connection = await getConnection();

  const [rows, field] = await connection.execute<RowDataPacket[]>("SELECT * FROM NOTICE ORDER BY ID DESC LIMIT 10");
  
  killConnection(connection);


  return rows;
  
}

export async function addNoticePosting(value: { title: string, content: string }) {
  const connection = await getConnection();

  await connection.execute<RowDataPacket[]>("INSERT INTO NOTICE(`title`,`content`,`writer`) VALUES('" + value.title + "','"+ value.content +"','admin')");
  
  killConnection(connection);
}
