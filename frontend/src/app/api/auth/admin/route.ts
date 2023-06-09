import { getConnection, killConnection } from "@/function/database/mysql";
import { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const account = (request.url.split("?")[1]).split("=")[1];

  if(await validAdmin(account)){
    return new NextResponse("관리자입니다.", {
      status: 200,
    })
  } else {
    return new NextResponse("관리자가 아닙니다.", {
      status: 202,
    })
  }
}

async function validAdmin(account: string){
  const connection = await getConnection();
  
  const result = await connection.execute<RowDataPacket[]>(
    "SELECT * FROM ADMIN WHERE ACCOUNT='" + account + "'"
  );
  
  return JSON.parse(JSON.stringify(result))[0][0] ? true : false;
}
