"use client";

import { goto } from "@/function/util/client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRef } from "react";

/**
 * 댓글 창
 */
export default function ReplyWriter({ postingID }: { postingID: string }) {
  const session = useSession();
  const replyContent = useRef<HTMLTextAreaElement>(null);
  const thisPath = usePathname();

  function enter(e: any) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  async function submit(isLike = false) {
    const commentLength = replyContent.current?.value.length ?? 0;

    if (commentLength >= 1 && commentLength < 500) {
      await fetch("https://www.eurekasolusion.shop/api/reply", {
        method: "POST",
        body: JSON.stringify({
          postingid: postingID,
          username: session.data?.user?.name,
          userid: session.data?.user?.email,
          content: replyContent.current?.value,
        }),
      });
      replyContent.current!.value = "";
      goto(thisPath)
    } else {
      alert("댓글은 1자 이상, 500자 미만으로 작성해주세요.");
    }
  }

  if (typeof session.data?.user !== "undefined") {
    return (
      <>
        <main>
          <section>
            <span>
              {session.data?.user?.name} [
              {session.data?.user?.email?.split("@")[0]}]
            </span>
          </section>
          <section>
            <article>
              <textarea ref={replyContent} onKeyDown={enter}></textarea>
            </article>
            <article id="reply-submit-area">
              <button
                id="reply-submit"
                onClick={() => {
                  submit();
                }}
              >
                등록
              </button>
              <button
                id="reply-submit-like"
                onClick={() => {
                  submit(true);
                }}
              >
                추천 및 등록
              </button>
            </article>
          </section>
        </main>
        <style jsx>{`
          main {
            margin-top: 3vh;
            width: 70vw;
            height: 17vh;
            border-top: solid 2px #141414;
            background-color: #14141410;
            border-bottom: solid 2px #141414;
            display: flex;
            padding: 2vh 1vw;
            justify-content: space-between;
          }

          section {
          }

          span {
            display: inline-block;
            width: 10vw;
            height: 4vh;
            border: solid 1px #141414;
            border-radius: 3px;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            font-size: 1vw;
          }

          article {
            width: 57vw;
          }

          #reply-submit-area {
            display: flex;
            justify-content: end;
          }

          textarea {
            display: inline-block;
            width: 57vw;
            height: 10vh;
            border: solid 1px #141414;
            border-radius: 3px;
            background-color: white;
            padding: 5px;
            font-size: 0.8vw;
          }

          button {
            display: inline-block;
            border: solid 1px #282828;
            border-radius: 5px;
            background-color: white;
            padding: 0.3vh 0.3vw;
            margin: 0.2vh 0.2vw;
            font-size: 0.8vw;
            background-color: #282828;
            color: white;
          }
        `}</style>
      </>
    );
  } else {
    return <></>;
  }
}
