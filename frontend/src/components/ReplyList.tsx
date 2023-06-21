"use client";

import { formatDateTime } from "@/function/util/datetime";
import { useState, useEffect } from "react";

type Reply = {
  id: number;
  postingid: number;
  username: string;
  userid: string;
  content: string;
  regidate: string;
};

export default function ReplyList({ postingID }: { postingID: string }) {
  const [replys, setReplys] = useState([]);

  useEffect(() => {
    (async function () {
      const res = await fetch(`https://www.eurekasolusion.shop/reply?postingno=${postingID}`, {
        method: "GET",
        mode: "no-cors",
      });

      const replyArr = await res.json();
      const replyCount = replyArr.length;

      if (replyCount >= 1) {
        setReplys(
          replyArr.map((reply: Reply, index: number) => {
            const dateTime = formatDateTime(new Date(reply.regidate));
            return (
              <article
                key={postingID + "-" + index}
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  borderTop: "1px solid #14141410",
                  padding: "0.5vh 1vw",
                }}
              >
                <span
                  key={postingID + "-" + index + "username"}
                  style={{ display: "inline-block", width: "8vw" }}
                >
                  {reply.username} [{reply.userid.split("@")[0]}]
                </span>
                <span
                  key={postingID + "-" + index + "content"}
                  style={{ display: "inline-block", width: "40vw" }}
                >
                  {reply.content}
                </span>
                <span
                  key={postingID + "-" + index + "regidate"}
                  style={{
                    display: "inline-block",
                    width: "10vw",
                    textAlign: "center",
                  }}
                >
                  {dateTime}
                </span>
              </article>
            );
          })
        );
        console.log(replys);
      }
    })();
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
