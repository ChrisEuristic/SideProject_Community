"use client";

import { LoggedInAtom } from "@/recoil/SignAtom";
import { IsOnProfilePopup, SlideWindowState } from "@/recoil/WindowAtom";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function ProfilePopup() {
  const router = useRouter();
  const session = useSession();
  const setIsLoggedIn = useSetRecoilState(LoggedInAtom);
  const [isOnProfilePopup, setIsOnProfilePopup] =
    useRecoilState(IsOnProfilePopup);

  async function logOut() {
    if (process.env.NODE_ENV === "development") {
      signOut({
        callbackUrl: `http://1.254.141.230:3000/api/auth/logout`,
      });
    }
    if (process.env.NODE_ENV === "production") {
      signOut({
        callbackUrl: `https://toy-project-community.vercel.app/api/auth/logout`,
      });
    }
  }

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (isOnProfilePopup === SlideWindowState.OPEN) {
        setIsOnProfilePopup(SlideWindowState.CLOSE);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOnProfilePopup, setIsOnProfilePopup]);

  return (
    <>
      <main
        className={
          isOnProfilePopup === SlideWindowState.CLOSE ? "anim-off" : "anim-on"
        }
      >
        <Link href={"/profile"}>마이 페이지</Link>
        <button onClick={() => logOut()}>로그아웃</button>
      </main>
      <style jsx>{`
        main {
          position: absolute;
          width: 10vw;
          height: 20vh;
          border-radius: 1rem;
          box-shadow: #141414 1px 1px 3px;
          display: flex;
          flex-direction: column;
          padding: 2vh 0.5vw;

          font-weight: 400;

          animation-duration: 0.25s;
          animation-timing-function: ease;
          animation-fill-mode: forwards;
        }

        .anim-off {
          animation-name: animation-off;
        }

        .anim-on {
          animation-name: animation-on;
        }

        @keyframes animation-off {
          from {
            opacity: 1;
            top: 10vh;
          }
          50% {
          }
          99% {
            opacity: 0;
            top: 9vh;
          }
          to {
            opacity: 0;
            top: 9vh;
            pointer-events: none;
          }
        }

        @keyframes animation-on {
          from {
            opacity: 0;
            top: 9vh;
            height: 5vh;
            display: flex;
          }
          30% {
            0pacity: 1;
            top: 10vh;
          }
          99% {
            opacity: 1;
            top: 10vh;
            height: 20vh;
          }
          to {
            opacity: 1;
            top: 10vh;
            height: 20vh;
            pointer-events: auto;
          }
        }
      `}</style>
    </>
  );
}
