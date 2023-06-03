'use client';

export default function Signin () {
  // 0. 클릭시 로그인 상태인지 체크하여 자동 로그인 진행 여부 결정.
  // 1. 로그인 토큰이 있는지 여부 확인.
  // 2. 있으면 해당 토큰을 읽어 바로 자동 로그인.
    // 2-1. 클라이언트: 쿠키에서 토큰을 읽고 Next API 서버로 Req.
    // 2-2. Next API: 클라이언트에서 받은 토큰을 Express API 서버로 Req.
    // 2-3. Express API: 토큰 유효성 검사 및 DB에서 토큰 조회하여 회원정보 및 200 OK Res.
    // 2-4. Next API: Express에서 받은 Res를 클라이언트로 Res.
    // 2-5. 클라이언트는 Next API로부터 받은 200 OK Res 파싱하여 Recoil Atom에 200 OK와 회원정보 담아 로그인 처리.
  // 3. 토큰 없으면 Signin 페이지로 이동.
  return (
    <>
      <h1>hi</h1>
    </>
  );
}