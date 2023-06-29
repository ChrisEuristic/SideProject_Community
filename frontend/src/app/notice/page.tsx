"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { formatDateTime } from "@/function/util/datetime";

export default function NoticePage() {
  const [tbody, setTbody] = useState<JSX.Element[]>();
  const [pageNo, setPageNo] = useState(1);
  const [maxPageNo, setMaxPageNo] = useState(1);
  const [pageNoButton, setPageNoButton] = useState<JSX.Element[]>();
  const [isAdmin, setIsAdmin] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    (async function () {
      const res = await fetch(`https://www.eurekasolusion.shop/api/admin?email=${session?.user?.email}`);
      if(res.status === 200) {
        setIsAdmin(true);
      }
    })();
  }, [session?.user?.email, setIsAdmin]);

  useEffect(() => {
    if (pageNo < 1 || pageNo > maxPageNo) {
      setPageNo(1);
    }

    (async function () {
      const res = await fetch(`https://www.eurekasolusion.shop/api/posting?pageNo=${pageNo}`);
      const result: [
        number,
        {
          id: number;
          title: string;
          writer: string;
          visit: number;
          regidate: string;
        }[]
      ] = await res.json();
      
      const [postingQty, content] = result;

      const tempPageNoButton = [];
      setMaxPageNo(Math.ceil(postingQty / 10));
      for (let i = 1; i <= maxPageNo; i++) {
        tempPageNoButton.push(
          <button
            key={"pageNoButton" + i}
            style={{ margin: "0 0.5vw" }}
            onClick={() => {
              setPageNo(i);
            }}
          >
            {i}
          </button>
        );
      }
      setPageNoButton(tempPageNoButton);

      const tempTbody = [];

      for (let [key, item] of Object.entries(content)) {
        const dateTime = formatDateTime(new Date(item.regidate));
        tempTbody.push(
          <tr className="h-10">
            <td
              key={item.id + key}
              className="border border-gray-800 text-center"
            >
              {item.id}
            </td>
            <td
              key={item.title + key}
              className="border border-gray-800 text-center"
            >
              <Link href={"/notice/no/" + item.id} prefetch={false}>
                {item.title}
              </Link>
            </td>
            <td
              key={item.writer + key}
              className="border border-gray-800 text-center"
            >
              {item.writer}
            </td>
            <td
              key={String(item.regidate) + key}
              className="border border-gray-800 text-center"
            >
              {dateTime}
            </td>
            <td
              key={item.visit + key}
              className="border border-gray-800 text-center"
            >
              {item.visit}
            </td>
          </tr>
        );
      }
      setTbody(tempTbody);
    })();
  }, [pageNo, maxPageNo]);

  return (
    <>
      <main className="w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold">공지사항</h1>

        <br />
        <table className="w-8/12">
          <thead>
            <tr>
              <td colSpan={5} style={{ textAlign: "end" }}>
                {isAdmin ? (
                  <>
                    <Link href={"/notice/writing"}>
                      <button
                        style={{
                          borderRadius: "0.25rem",
                          border: "solid 1px #282828",
                          padding: "0.25rem 0.5rem",
                        }}
                      >
                        글쓰기
                      </button>
                    </Link>
                  </>
                ) : (
                  <span></span>
                )}
              </td>
            </tr>
            <tr>
              <th className="border border-gray-800 w-20 h-14">글번호</th>
              <th className="border border-gray-800">제목</th>
              <th className="border border-gray-800 w-32">작성자</th>
              <th className="border border-gray-800 w-40">작성일</th>
              <th className="border border-gray-800 w-16">조회수</th>
            </tr>
          </thead>
          <tbody>{tbody}</tbody>
        </table>
        <section>
          <button onClick={() => setPageNo((pre) => (pre > 1 ? pre - 1 : 1))}>
            <GrFormPrevious />
          </button>
          {pageNoButton}
          <button
            onClick={() =>
              setPageNo((pre) => (pre < maxPageNo ? pre + 1 : maxPageNo))
            }
          >
            <GrFormNext />
          </button>
        </section>
      </main>
      <style jsx>{`
        section {
          margin-top: 2vh;
          font-size: 1.25rem;
        }

        section button {
          margin: 0 0.5vw;
        }
      `}</style>
    </>
  );
}
