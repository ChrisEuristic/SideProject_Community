"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ModifyPage() {
  const searchParams = useSearchParams().get("no");
  let contents;
  const contentsRef = useRef(contents);
  
  useEffect(() => {
    fetch("/api/posting", {
      method: "PUT",
      body: JSON.stringify({
        no: searchParams,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        contentsRef.current = result.content;
        console.log(contentsRef.current);
      });

  },[searchParams]);
  
 return <></>
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
          <span style={{ fontWeight: "bold" }}>{contents.title}</span>
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
              조회 {contents.visit}
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
        <div style={{ padding: "0 0.5rem" }}>
          <textarea value={contents.content}></textarea>
          {contents.content}
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
            <Link href={"/notice/writing"}>
              <button
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
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
