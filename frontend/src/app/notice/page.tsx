'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NoticePage() {

  const [tbody, setTbody] = useState<JSX.Element[]>();
  useEffect(() => {
    (async function () {
      const res = await fetch("/api/posting", {
        mode: "no-cors",
      })

      const content: {id:number, title: string, writer: string, visit: number, regidate: string}[] = await res.json();
      console.log(content);
      const tempTbody = [];

      for (let [key, item] of Object.entries(content)) {
        const dateTime = item.regidate.split("T");
        tempTbody.push(
          <tr className="h-10">
            <td key={item.id + key} className="border border-gray-800 text-center">{item.id}</td>
            <td key={item.title + key} className="border border-gray-800 text-center"><Link href={"/notice/no/" + item.id} prefetch={false}>{item.title}</Link></td>
            <td key={item.writer + key} className="border border-gray-800 text-center">{item.writer}</td>
            <td key={String(item.regidate) + key} className="border border-gray-800 text-center">{dateTime[0]} {dateTime[1].split(".")[0]}</td>
            <td key={item.visit + key} className="border border-gray-800 text-center">{item.visit}</td>
          </tr>
        );
      }

      setTbody(tempTbody);
    })()
  }, [])



  return (
    <>
      <main className="w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold">공지사항</h1>
        
        <br />
        <table className="w-8/12">
          <thead>
            <tr><td colSpan={5} style={{textAlign: "end"}}><Link href={"/notice/writing"}><button style={{borderRadius: "0.25rem", border: "solid 1px #282828", padding: "0.25rem 0.5rem"}}>글쓰기</button></Link></td></tr>
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
      </main>
    </>
  );
}
