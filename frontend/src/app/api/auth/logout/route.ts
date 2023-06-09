import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.redirect(
      new URL(
        `https://kauth.kakao.com/oauth/logout?client_id=${process.env.KAKAO_CLIENT_ID}&logout_redirect_uri=http://1.254.141.230:3000`,
        request.url
      )
    );
  }
  if (process.env.NODE_ENV === "production") {
    return NextResponse.redirect(
      new URL(
        `https://kauth.kakao.com/oauth/logout?client_id=${process.env.KAKAO_CLIENT_ID}&logout_redirect_uri=https://toy-project-community.vercel.app`,
        request.url
      )
    );
  }
}
