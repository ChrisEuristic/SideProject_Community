"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function WritingPage() {
  const router = useRouter();
  const titleBox = useRef<HTMLInputElement>(null);
  const contentBox = useRef<HTMLTextAreaElement>(null);

  return (
    <main style={{ width: "70vw", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "50vw",
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: "2rem 0 2rem 0",
          }}
        >
          공지 쓰기
        </h1>
        <table>
          <tbody>
            <tr>
              <th
                style={{
                  border: "1px solid #282828",
                  height: "3rem",
                  cursor: "default",
                }}
              >
                제목
              </th>
              <td style={{ border: "1px solid #282828", height: "3rem" }}>
                <input
                  ref={titleBox}
                  type="text"
                  style={{ width: "100%", padding: "0 0.25rem 0 0.25rem" }}
                />
              </td>
            </tr>
            <tr>
              <th
                style={{
                  border: "1px solid #282828",
                  height: "30rem",
                  cursor: "default",
                }}
              >
                내용
              </th>
              <td style={{ border: "1px solid #282828", height: "30rem" }}>
                <textarea
                  ref={contentBox}
                  style={{ width: "100%", height: "95%", padding: "0.25rem" }}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() => {
            submitNotice(
              titleBox.current?.value as string,
              contentBox.current?.value as string,
              router
            );
          }}
          style={{
            backgroundColor: "#282828",
            borderRadius: "0.3rem",
            marginTop: "1rem",
            padding: "0.4rem 0.7rem",
            color: "white",
          }}
        >
          공지 등록하기
        </button>
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
async function submitNotice(title: string, content: string, router: any) {
  const res = await fetch("/api/posting", {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  if (res.status === 200) {
    console.log("공지사항 등록 완료");
    router.push(res.url);
  }
}
