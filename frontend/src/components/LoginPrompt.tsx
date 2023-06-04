"use client";

import { signIn } from "next-auth/react";
import { IoInformationCircle } from "react-icons/io5";

export default function LoginPrompt() {
  return (
    <div>
      <main onClick={() => signIn("kakao")}>
        <IoInformationCircle size={60} />
        <section>
          <article>로그인이 필요한 서비스입니다.</article>
          <article>로그인 후 이용해주세요.</article>
        </section>
      </main>
      <style jsx>{`
        div {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        main {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          width: 90%;
          max-width: 20vw;
          height: 20vh;
          border: 1px solid #141414;
          border-radius: 0.5rem;
          padding: 2vh;
          color: white;
          background-color: #141414;
          cursor: pointer;
        }

        section {
          margin-top: 2vh;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
