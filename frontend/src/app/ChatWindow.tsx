"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { BsFillPinAngleFill, BsFillPinFill } from "react-icons/bs";

export default function ChatWindow() {
  const isOnChatting = useAppSelector((state) => state.chattoggleReducer.value);
  const setIsOnChatting = useAppDispatch();

  const [navClassName, setNavClassName] = useState("");

  useEffect(() => {
    if (isOnChatting) {
      setNavClassName("toggle-on");
    } else {
      if (navClassName) setNavClassName("toggle-off");
    }
  }, [isOnChatting, navClassName]);

  return (
    <>
      <nav className={navClassName}>
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
          animation-duration: 1s;
          animation-timing-function: ease-in-out;
          animation-fill-mode: forwards;
        }

        .toggle-off {
          animation-name: chattingOff;
          animation-duration: 1s;
          animation-timing-function: ease-in-out;
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
