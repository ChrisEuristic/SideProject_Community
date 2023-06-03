"use client";

import { LoggedInAtom } from "@/recoil/SignAtom";
import Image from "next/image";
import Link from "next/link";
import { useRecoilState } from "recoil";

export default function TitleBar() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoggedInAtom);

  return (
    <>
      <nav>
        <section
          id="section-logo"
          aria-label="Logo Area"
        >
          <article>
            <Link href={"/"}>
              <button>
                <Image
                  src="/Logo.svg"
                  width={typeof window !== 'undefined' ? window.innerWidth * 0.2 : 1920 * 0.2} // 20vw
                  height={typeof window !== 'undefined' ? window.innerWidth * 0.2 * 0.162 : 1920 * 0.2 * 0.162}
                  alt="Logo of website"
                />{" "}
              </button>
            </Link>
          </article>
        </section>
        <section id="section-menu" aria-label="Menu Area">
          <article>
            <Link href={"/intro"}>
              <button>소개</button>
            </Link>
          </article>
          <article>
            <Link href={"/notice"}>
              <button>공지사항</button>
            </Link>
          </article>
          <article>
            <Link href={"/issue"}>
              <button>이슈피드</button>
            </Link>
          </article>
        </section>
        <section id="section-personal" aria-label="Personal Area">
          <article>
            <Link href={"/shop"}>
              <button>마켓</button>
            </Link>
          </article>
          <article>
            <Link href={"/payment"}>
              <button>충전하기</button>
            </Link>
          </article>
          <article>
            <Link href={"/profile"}>
              <button>닉네임다섯 [TYPE]</button>
            </Link>
          </article>
          <article>
            <Link href={"/profile"}>
              <button>프로필</button>
            </Link>
          </article>
        </section>
      </nav>
      <style jsx>{`
        nav {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
          font-weight: bold;
        }

        #section-logo {
          width: 20vw;
          height: 100%;
          display: flex;
          margin-left: 1vw;
          justify-content: center;
          align-items: center;
        }

        #section-menu {
          width: 30vw;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.25rem;
        }

        #section-personal {
          width: 20vw;
          height: 100%;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
        }
      `}</style>
    </>
  );
}
