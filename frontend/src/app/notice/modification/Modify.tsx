"use client";

import { goto } from "@/function/util/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Modify({ content, postingNo }: any) {
  const titleBox = useRef<HTMLSpanElement>(null);
  const contentBox = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

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
          수정
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
            {content.title}
          </span>
          <span
            style={{ display: "inline-block", width: "10vw", textAlign: "end" }}
          >
            <span
              style={{
                display: "inline-block",
                paddingRight: "0.5rem",
                borderRight: "1px solid #28282830",
                lineHeight: "1rem",
                fontSize: "0.9rem",
              }}
            >
              조회 {content.visit}
            </span>
            <span
              style={{
                display: "inline-block",
                padding: "0 0.5rem",
                borderRight: "1px solid #28282830",
                lineHeight: "1rem",
                fontSize: "0.9rem",
              }}
            >
              추천 {0}
            </span>
            <span style={{ paddingLeft: "0.5rem", fontSize: "0.9rem" }}>
              댓글 {0}
            </span>
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
            {content.content}
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
                  postingNo as string,
                  router,
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
              수정 완료
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
async function submitNotice(
  title: string,
  content: string,
  postingNo: string,
  router: AppRouterInstance
) {
  const res = await fetch("https://www.eurekasolusion.shop/api/posting", {
    method: "PUT",
    body: JSON.stringify({
      postingNo: postingNo,
      title: title,
      content: content,
    }),
  });

  if (res.status === 200) {
    console.log("공지사항 수정 완료");
    router.push(`/notice/no/${postingNo}`)
    router.refresh();
  }
}
