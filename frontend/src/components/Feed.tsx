"use client";

import { whatTimesAgo } from "@/function/util/datetime";
import Image from "next/image";
import { useRef, useState } from "react";
import { RxShare2 } from "react-icons/rx";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiChatBubbleBottomCenterText,
} from "react-icons/hi2";

export default function Feed({
  userImage,
  userName,
  feedContent,
  regidate,
  hashTag,
}: {
  userImage: string;
  userName: string;
  feedContent: string;
  regidate: string;
  hashTag: string;
}) {
  const [heartClassName, setHeartClassName] = useState("");
  const [chatClassName, setChatClassName] = useState("");
  const [shareClassName, setShareClassName] = useState("");
  const photoSize = useRef({width: 50, height: 50});
  return (
    <>
      <main>
        <aside>
          <Image
            src={userImage}
            alt="user-profile-photo"
            width={50}
            height={50}
            style={{ borderRadius: "50%", maxWidth: `${photoSize.current.width}px`, maxHeight: `${photoSize.current.height}px`}}
          />
        </aside>
        <section>
          <div>
            <header>{userName}</header>
            <nav>{whatTimesAgo(regidate)}</nav>
          </div>
          <article>{feedContent}</article>
          <footer>
            {hashTag}
            <article>
              <button
                className={heartClassName}
                onMouseOver={() => {
                  setHeartClassName("feed-button-mouseover");
                }}
                onMouseLeave={() => {
                  setHeartClassName("feed-button-mouseleave");
                }}
              >
                <AiOutlineHeart fontSize={"1.2rem"} />
                {/* <AiFillHeart fontSize={"1.2rem"} /> */}
              </button>
              <button
                className={chatClassName}
                onMouseOver={() => {
                  setChatClassName("feed-button-mouseover");
                }}
                onMouseLeave={() => {
                  setChatClassName("feed-button-mouseleave");
                }}
              >
                <HiOutlineChatBubbleBottomCenterText fontSize={"1.2rem"} />
                {/* <HiChatBubbleBottomCenterText fontSize={"1.2rem"} /> */}
              </button>
              <button
                className={shareClassName}
                onMouseOver={() => {
                  setShareClassName("feed-button-mouseover");
                }}
                onMouseLeave={() => {
                  setShareClassName("feed-button-mouseleave");
                }}
              >
                <RxShare2 />
              </button>
            </article>
          </footer>
        </section>
      </main>
      <style jsx>{`
        main {
          width: 50vw;
          height: 10vh;
          display: flex;
          align-items: center;
          border: solid 1px #141414;
          border-radius: 1vw;
          margin: 1vh 0;
          padding: 1vh 1vw;
        }

        section {
          width: 45vw;
          margin-left: 1vw;
        }

        div {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }

        header {
          font-weight: bold;
        }

        footer {
          display: flex;
          justify-content: space-between;
        }

        footer > article {
          width: 5vw;
          display: flex;
          justify-content: space-between;
        }

        button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
        }
        .feed-button-mouseover {
          animation-name: feed-button-anim-on;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }

        .feed-button-mouseleave {
          animation-name: feed-button-anim-off;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }

        @keyframes feed-button-anim-on {
          from {
            background-color: rgba(0, 0, 0, 0);
          }
          to {
            background-color: rgba(0, 0, 0, 0.2);
          }
        }
        @keyframes feed-button-anim-off {
          from {
            background-color: rgba(0, 0, 0, 0.2);
          }
          to {
            background-color: rgba(0, 0, 0, 0);
          }
        }
      `}</style>
    </>
  );
}
