import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.redirect(new URL(`https://kauth.kakao.com/oauth/logout?client_id=${process.env.KAKAO_CLIENT_ID}&logout_redirect_uri=http://1.254.141.230:3000`, request.url));
}