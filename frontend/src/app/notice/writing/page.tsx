"use client";

import { goto } from "@/function/util/client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";

export default function WritingPage() {
  const titleBox = useRef<HTMLSpanElement>(null);
  const contentBox = useRef<HTMLTextAreaElement>(null);

  return (
    <main style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "70vw",
        }}
      >
        <h1
          style={{
            width: "100%",
            textAlign: "left",
            fontSize: "1.6rem",
            fontWeight: "bold",
          }}
        >
          공지쓰기
        </h1>
        <div
          style={{
            width: "100%",
            border: "1px solid #282828",
            margin: "1rem 0",
          }}
        ></div>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 0.5rem",
          }}
        >
          <span
            ref={titleBox}
            contentEditable="true"
            style={{ fontWeight: "bold", outline: "none", width: "60vw" }}
          >
          </span>
        </header>
        <div
          style={{
            width: "100%",
            borderBottom: "0.5px solid #28282870",
            margin: "1rem 0",
          }}
        ></div>
        <div style={{ padding: "0 0.5rem", height: "60vh" }}>
          <textarea ref={contentBox} style={{ width: "100%", height: "100%" }}>
          </textarea>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Link href={"/notice"}>
              <button
                style={{
                  backgroundColor: "#282828",
                  borderRadius: "0.3rem",
                  marginTop: "1rem",
                  padding: "0.4rem 0.7rem",
                  color: "white",
                  justifySelf: "left",
                }}
              >
                목록
              </button>
            </Link>
          </div>
          <div>
            <button
              onClick={() => {
                submitNotice(
                  titleBox.current?.textContent as string,
                  contentBox.current?.value as string,
                );
              }}
              style={{
                backgroundColor: "#282828",
                borderRadius: "0.3rem",
                margin: "0.5rem 0 0 0.5rem",
                padding: "0.4rem 0.7rem",
                color: "white",
              }}
            >
              작성 완료
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

/**
 * 작성된 공지사항을 api server로 전송하는 함수.
 * 완료시 /notice로 리다이렉트.
 * @param title 공지사항의 제목
 * @param content 공지사항 내용
 * @param router 리다이렉트를 위한 라우터
 */
async function submitNotice(title: string, content: string) {
  const res = await fetch("/api/posting", {
    mode: "no-cors",
    method: "POST",
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  console.log("status >> ", res.status);

  if (res.status === 200) {
    console.log("공지사항 등록 완료");
    goto("/notice");
  }
}
