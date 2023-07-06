"use client";

import Link from "next/link";
import styles from "./styles.module.css";
import SlideBar from "./components/SlideBar";
import {useEffect, useRef, useState} from "react";

export default function TestPage() {

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.h1}>
          성격 테스트로 자신의 성향과 행동에 대해 정확히 분석 받아보세요!
        </h1>
        <section className={styles.section}>
          <article className={styles.description}>
            나에 대해 알아볼까요?
          </article>
          <article>
            <Link href={"/test/personal"} className={styles.link1}>
              테스트 하러가기
            </Link>
          </article>
        </section>
        <section className={styles.section}>
          <article className={styles.description}>
            연인, 또는 누군가와의 궁합을 알아볼까요?{" "}
            <span className={styles.tip}>
              두 사람의 테스트 결과로 궁합을 분석해볼 수 있어요.
            </span>
          </article>
          <article>
            <Link href={"/test/couple"} className={styles.link2}>
              테스트 하러가기
            </Link>
          </article>
        </section>
        <section className={styles.section}>
          <article className={styles.description}>
            유사한 상대를 만들어 조언을 구해볼까요?{" "}
            <span className={styles.tip}>
              평소 대하기 어려웠던 사람과 가상으로 대화해볼 수 있어요.
            </span>
          </article>
          <article>
            <Link href={"/test/advice"} className={styles.link3}>
              어드바이저 만들기
            </Link>
          </article>
        </section>
      </main>
    </>
  );
}
