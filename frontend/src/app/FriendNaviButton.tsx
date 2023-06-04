"use client";

import { IsOnFriendBar, SlideWindowState } from "@/recoil/WindowAtom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";

export default function FriendNaviButton() {
  const [isOnFriendsWindow, setIsOnFriendsWindow] = useRecoilState(IsOnFriendBar);

  const [buttonDisplay, setButtonDisplay] = useState("button-display-off");

  useEffect(() => {
    if (isOnFriendsWindow) {
      setButtonDisplay("button-display-off");
    } else {
      setButtonDisplay("button-display-on");
    }
  }, [isOnFriendsWindow]);

  return (
    <>
      <button
        className={buttonDisplay}
        onClick={() => {
          setIsOnFriendsWindow(SlideWindowState.OPEN);
        }}
      >
        <FaUserFriends />
      </button>
      <style jsx>{`
        button {
          position: fixed;
          left: 1rem;
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
