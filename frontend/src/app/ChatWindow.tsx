"use client";

import {
  reset,
  setOpen,
  setOpenFix,
} from "@/redux/features/chattoggle/chattoggleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { BsFillPinAngleFill, BsFillPinFill } from "react-icons/bs";

export default function ChatWindow() {
  const isOnChatting = useAppSelector((state) => state.chattoggleReducer.value);
  const setIsOnChatting = useAppDispatch();
  const [navClassName, setNavClassName] = useState("");
  const [spanClassName, setSpanClassName] = useState("");

  function chatWindowFix() {
    if (isOnChatting === 1) {
      setIsOnChatting(setOpenFix());
      setSpanClassName("span-anim");
      setTimeout(() => {
        setSpanClassName("");
      }, 1000);
    } else {
      setIsOnChatting(setOpen());
    }
  }

  useEffect(() => {
    console.log("isOnChatting >> ", isOnChatting);
    if (isOnChatting === 1) {
      // 채팅창이 토글ON인 상태
      setNavClassName("toggle-on");
    } else if (isOnChatting === 2) {
      // 채팅창이 Fix인 상태
    } else {
      // 채팅창이 토글OFF인 상태
      if (navClassName) setNavClassName("toggle-off");
    }

    const handleClick = (e: Event) => {
      if (e.target instanceof HTMLElement) {
        if (!(e.target.id === "chat-window" || e.target.tagName === "path")) {
          if (isOnChatting === 1) {
            console.log(isOnChatting, isOnChatting === 1);
            setIsOnChatting(reset());
          }
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOnChatting, navClassName, setIsOnChatting]);

  return (
    <>
      <nav id="chat-window" className={navClassName}>
        <button id="chat-fix-button" onClick={chatWindowFix}>
          <div>
            {isOnChatting === 2 ? <BsFillPinFill /> : <BsFillPinAngleFill />}
          </div>
        </button>
        <span className={spanClassName}>멈춰!</span>
      </nav>
      <style jsx>{`
        nav {
          position: fixed;
          right: -30rem;
          border: solid 1px #000000;
          border-radius: 0.5rem 0 0 0;
          width: 30rem;
          height: 100%;
          background: white;
        }

        .toggle-on {
          animation-name: chattingOn;
          animation-duration: 0.5s;
          animation-timing-function: ease;
          animation-fill-mode: forwards;
        }

        .toggle-off {
          animation-name: chattingOff;
          animation-duration: 0.5s;
          animation-timing-function: ease;
          animation-fill-mode: forwards;
        }

        @keyframes chattingOn {
          from {
            right: -30rem;
          }
          to {
            right: 0rem;
          }
        }

        @keyframes chattingOff {
          from {
            right: 0rem;
          }
          to {
            right: -30rem;
          }
        }

        button {
          margin: 0.5rem;
          width: 1.2rem;
          height: 1.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        div {
          font-size: 1rem;
          user-select: none;
        }

        div:hover {
          font-size: 1.2rem;
        }

        span {
          opacity: 0;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 4rem;
          height: 2rem;
          position: absolute;
          top: -2rem;
          left: 0.2rem;
          color: white;
          border: solid 1px #484848;
          border-radius: 0.4rem;
          background: #484848;
        }

        span:after {
          border-top: 0.5rem solid #484848;
          border-left: 0.4rem solid transparent;
          border-right: 0.4rem solid transparent;
          border-bottom: 0px solid transparent;
          content: "";
          position: absolute;
          top: 1.9rem;
          left: 0.5rem;
        }

        .span-anim {
          animation-name: stoped;
          animation-duration: 1s;
          animation-timing-function: ease;
          animation-fill-mode: forwards;
        }

        @keyframes stoped {
          from {
            opacity: 0;
          }
          1% {
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
