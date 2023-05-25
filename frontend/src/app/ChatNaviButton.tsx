"use client";

import { toggle } from "@/redux/features/chattoggle/chattoggleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { TbBrandHipchat } from "react-icons/tb";

export default function ChatNaviButton() {
  const isOnChatting = useAppSelector((state) => state.chattoggleReducer.value);
  const setIsOnChatting = useAppDispatch();

  const [buttonDisplay, setButtonDisplay] = useState("button-display-off");

  useEffect(() => {
    if (isOnChatting) {
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
          setIsOnChatting(toggle());
        }}
      >
        <TbBrandHipchat />
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
          font-size: 3rem;
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
          animation-duration: 1.25s;
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
