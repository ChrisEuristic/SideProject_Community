"use client";

import { doInBrowser } from "@/function/util/client";
import Profile from "../components/Profile";
import { LoggedInAtom } from "@/recoil/SignAtom";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function TitleBar() {
  const session = useSession();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoggedInAtom);
  const [logoSize, setLogoSize] = useState({ width: 50, height: 58});


  function login(){
    signIn("kakao");
  }

  useEffect(() => {
    setLogoSize(doInBrowser(() => {
      return {width: window.innerWidth * 0.2, height: window.innerWidth * 0.2 * 0.162}
    }))
  }, [])

  useEffect(() => {
    if (session.data?.user?.name !== undefined) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [session.data?.user?.name!]);

  return (
    <>
      <nav>
        <section id="section-logo" aria-label="Logo Area">
          <article id="section-logo-art">
            <Link href={"/"}>
                <Image
                  src="/Service Logo.svg"
                  width={logoSize.width} // 20vw
                  height={logoSize.height}
                  alt="Logo of website"
                />{" "}
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
            <Link href={"/payment"}>
              <button>충전하기</button>
            </Link>
          </article>
          <article>
            {isLoggedIn ? (
              <Profile
                userName={session.data?.user?.name}
                userType={"[TYPE]"}
                userImage={session.data?.user?.image}
              />
            ) : (
              <button onClick={login}>로그인</button>
            )}
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
          width: 15vw;
          height: 100%;
          display: flex;
          margin-left: 1vw;
          align-items: center;
        }

        #section-logo-art {
          width: 6vw;
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
          width: 15vw;
          height: 100%;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
        }
      `}</style>
    </>
  );
}
