"use client";

import { reset } from "@/redux/features/chattoggle/chattoggleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { BsFillPinAngleFill, BsFillPinFill } from "react-icons/bs";

export default function ChatWindow() {
  const isOnChatting = useAppSelector((state) => state.chattoggleReducer.value);
  const setIsOnChatting = useAppDispatch();

  const [navClassName, setNavClassName] = useState("");

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target instanceof HTMLElement && isOnChatting) {
        if (e.target.id !== "chat-window") {
          setIsOnChatting(reset());
        }
      }
    });
    if (isOnChatting) {
      // 채팅창이 토글ON인 상태
      setNavClassName("toggle-on");
    } else {
      // 채팅창이 토글OFF인 상태
      if (navClassName) setNavClassName("toggle-off");
    }
  }, [isOnChatting, navClassName, setIsOnChatting]);

  return (
    <>
      <nav id="chat-window" className={navClassName}>
        <BsFillPinAngleFill /> <BsFillPinFill />
      </nav>
      <style jsx>{`
        nav {
          position: fixed;
          right: -20rem;
          border: solid 1px #000000;
          border-radius: 0.5rem 0 0 0;
          width: 20rem;
          height: 100%;
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
            right: -20rem;
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
            right: -20rem;
          }
        }
      `}</style>
    </>
  );
}
