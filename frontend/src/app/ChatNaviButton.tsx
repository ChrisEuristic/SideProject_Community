"use client";

import { IsOnChatting, SlideWindowState } from "@/recoil/WindowAtom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { TbBrandHipchat } from "react-icons/tb";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";

export default function ChatNaviButton() {
  const [isOnChatting, setIsOnChatting] = useRecoilState(IsOnChatting);
  const [buttonDisplay, setButtonDisplay] = useState("button-display-off");

  useEffect(() => {
    if (isOnChatting !== SlideWindowState.CLOSE) {
      setButtonDisplay("button-display-off");
    } else {
      setButtonDisplay("button-display-on");
    }
  }, [isOnChatting]);

  return (
    <>
      <button
        className={buttonDisplay}
        onClick={() => {
          setIsOnChatting(SlideWindowState.OPEN);
        }}
      >
        <HiOutlineChatBubbleBottomCenterText />
        {/* <HiChatBubbleBottomCenterText */}
      </button>
      <style jsx>{`
        button {
          position: fixed;
          right: 1rem;
          bottom: 1rem;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          justify-content: center;
          align-items: center;
          font-size: 2.5rem;
        }
        button:hover {
          right: 1.05rem;
          bottom: 1.05rem;
        }
        button:active {
          right: 1rem;
          bottom: 1rem;
        }
        .button-display-on {
          animation-name: button-on;
          animation-duration: 0.5s;
          animation-timing-function: ease;
          animation-fill-mode: forwards;
        }
        .button-display-off {
          animation-name: button-off;
          animation-duration: 0.25s;
          animation-timing-function: ease;
          animation-fill-mode: forwards;
        }
        @keyframes button-on {
          from {
            opacity: 0;
          }
          80% {
            opacity: 0;
            display: flex;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes button-off {
          from {
            opacity: 1;
          }
          99% {
            opacity: 0;
          }
          to {
            opacity: 0;
            display: none;
          }
        }
      `}</style>
    </>
  );
}
