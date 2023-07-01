"use client";

import Profile from "../components/Profile";
import { LoggedInAtom } from "@/recoil/SignAtom";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styles from './titlebar.module.css';

export default function TitleBar() {
  const session = useSession();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoggedInAtom);


  function login(){
    signIn("kakao");
  }

  useEffect(() => {
    if (session.data?.user?.name !== undefined) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [session.data?.user?.name!]);

  return (
    <>
      <nav className={styles.nav}>
        <section className={styles.sectionLogo} aria-label="Logo Area">
          <article className={styles.sectionLogoArt}>
            <Link href={"/"} style={{display: "flex", alignItems: "center"}}>
                <Image
                  src="/Service Logo Wide.svg"
                  width={1000}
                  height={1000}
                  alt="Logo of website"
                />
            </Link>
          </article>
        </section>
        <section className={styles.sectionMenu} aria-label="Menu Area">
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
        <section className={styles.sectionPersonal} aria-label="Personal Area">
          <article className={styles.payment}>
            <Link href={"/payment"}>
              <button>충전하기</button>
            </Link>
          </article>
          <article className={styles.profile}>
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
    </>
  );
}
