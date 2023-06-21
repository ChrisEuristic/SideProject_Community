"use client";

import ReplyList from "@/components/ReplyList";
import ReplyWriter from "@/components/ReplyWriter";
import { getNoticeOne, incrementNoticeVisit } from "@/function/database/mysql";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";

type Posting = {
  id: number;
  title: string;
  content: string;
  writer: string;
  regidate: string;
  visit: number;
  like_count: number;
};

export default function NoticePostingPage({
  params,
}: {
  params: { slug: string };
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const { data: session } = useSession();
  const [content, setContent] = useState<Posting>();
  // 1. params.slug 번호로 DB에 검색해서 해당 엔티티 전부 가져오기.

  useEffect(() => {
    (async function () {
      const res = await fetch(`https://www.eurekasolusion.shop/api/posting/${params.slug}`);
      const result: Posting = await res.json();
      setContent(result as Posting);
    })();
  }, [params.slug]);

  useEffect(() => {
    (async function () {
      const res = await fetch(`/api/auth/admin?email=${session?.user?.email}`);
      if (res.status === 200) {
        setIsAdmin(true);
      }
    })();
  }, [session?.user?.email, setIsAdmin]);

  return (
    <main
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
          공지사항
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
          <span style={{ fontWeight: "bold" }}>[공지] {content?.title}</span>
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
              조회 {content?.visit}
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
          {content?.content}
          <div style={{ width: "100%", textAlign: "center", margin: "2rem 0" }}>
            <button
              style={{
                backgroundColor: "#282828",
                borderRadius: "0.3rem",
                marginTop: "0.5rem",
                padding: "0.4rem 0.7rem",
                color: "white",
              }}
            >
              <AiFillLike />
            </button>
          </div>
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
          {isAdmin ? (
            <div>
              <Link
                href={"/notice/modification/" + params.slug}
                prefetch={false}
              >
                <button
                  style={{
                    backgroundColor: "#282828",
                    borderRadius: "0.3rem",
                    margin: "0.5rem 0 0 0.5rem",
                    padding: "0.4rem 0.7rem",
                    color: "white",
                  }}
                >
                  수정
                </button>
              </Link>
              <Link
                href={{
                  pathname: "/notice/deletion",
                  query: { no: params.slug },
                }}
                prefetch={false}
              >
                <button
                  style={{
                    backgroundColor: "#282828",
                    borderRadius: "0.3rem",
                    margin: "0.5rem 0 0 0.5rem",
                    padding: "0.4rem 0.7rem",
                    color: "white",
                  }}
                >
                  삭제
                </button>
              </Link>
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
                  글쓰기
                </button>
              </Link>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <ReplyWriter postingID={params.slug} />
      <ReplyList postingID={params.slug} />
    </main>
  );
}
