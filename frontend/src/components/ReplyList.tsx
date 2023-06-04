"use client";

import { useState, useEffect } from "react";

type Reply = {
  id: number,
    postingid: number,
    username: string,
    userid: string,
    content: string,
    regidate: string,
}

export default function ReplyList({ postingID }: { postingID: string }) {
  const [replys, setReplys] = useState([<></>]);

  // 대충 postingNo로 댓글 싹 긁어와서 댓글번호순으로 추가하면 됨.

  useEffect(() => {

    // 이 자리에 fetch 후 for of 들어가야.

    (async function () {

      const res = await fetch(`/api/reply?postingno=${postingID}`, {
        method: "GET",
        mode: "no-cors",
      });

      const replyArr = await res.json();

      setReplys(replyArr.map((reply: Reply, index: number) => {
        const dateTime = reply.regidate.split("T")
        return (
          <article key={index} style={{display: "flex", width: "100%", justifyContent:"space-between", borderTop: "1px solid #14141410", padding: "0.5vh 1vw"}}>
          <span key={index + "username"} style={{display: "inline-block", width: "8vw"}}>{reply.username} [{reply.userid.split("@")[0]}]</span>
          <span key={index + "content"} style={{display: "inline-block", width: "40vw"}}>{reply.content}</span>
          <span key={index + "regidate"} style={{display: "inline-block", width: "10vw", textAlign: "center"}}>{dateTime[0]} {dateTime[1].split(".")[0]}</span>
        </article>
        )
      }))

      console.log(replys);
  
      const replyCount = replyArr.length;
    })()
  }, [postingID]);

  return (
    <>
      <main>
        <section>
          <article className="reply-count">댓글 {replys.length}</article>
        </section>
        <section>{replys}</section>
      </main>
      <style jsx>{`
        main {
          margin-top: 3vh;
          width: 70vw;
          border-top: solid 2px #141414;
          border-bottom: solid 2px #141414;
          display: flex;
          flex-direction: column;
          padding: 1vh 0 0.5vh 0;
          justify-content: space-between;
        }

        .reply-count {
          font-weight: bold;
          margin-bottom: 1vh;
          margin-left: 1vw;
        }
      `}</style>
    </>
  );
}
