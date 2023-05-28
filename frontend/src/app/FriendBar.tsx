"use client";

import { reset, setOpen, setOpenFix } from "@/redux/features/friends/friendsToggleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { BsFillPinAngleFill, BsFillPinFill } from "react-icons/bs";

export default function FriendBar() {
  const isOnFriendsWindow = useAppSelector((state) => state.friendsToggleReducer.value);
  const setIsOnFriendsWindow = useAppDispatch();
  const [navClassName, setNavClassName] = useState("");
  const [spanClassName, setSpanClassName] = useState("");

  function friendsWindowFix() {
    if (isOnFriendsWindow === 1) {
      setIsOnFriendsWindow(setOpenFix());
      setSpanClassName("span-anim-friends");
      setTimeout(() => {
        setSpanClassName("");
      }, 1000);
    } else {
      setIsOnFriendsWindow(setOpen());
    }
  }

  useEffect(() => {
    console.log("isOnFriendsWindow >> ", isOnFriendsWindow);
    if (isOnFriendsWindow === 1) {
      // 채팅창이 토글ON인 상태
      setNavClassName("toggle-on-friends");
    } else if (isOnFriendsWindow === 2) {
      // 채팅창이 Fix인 상태
    } else {
      // 채팅창이 토글OFF인 상태
      if (navClassName) setNavClassName("toggle-off-friends");
    }

    const handleClick = (e: Event) => {
      if (e.target instanceof HTMLElement) {
        if (!(e.target.id === "friends-window" || e.target.tagName === "path")) {
          if (isOnFriendsWindow === 1) {
            console.log(isOnFriendsWindow, isOnFriendsWindow === 1);
            setIsOnFriendsWindow(reset());
          }
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOnFriendsWindow, navClassName, setIsOnFriendsWindow]);

  return (
    <>
      <nav id="friends-window" className={navClassName}>
        <button id="friends-fix-button" onClick={friendsWindowFix}>
          <div>
            {isOnFriendsWindow === 2 ? <BsFillPinFill /> : <BsFillPinAngleFill />}
          </div>
        </button>
        <span className={spanClassName}>멈춰!</span>
      </nav>
      <style jsx>{`
        nav {
          position: fixed;
          left: -20rem;
          border: solid 1px #000000;
          border-radius: 0 0.5rem 0 0;
          width: 20rem;
          height: 100%;
          background: white;
          
        }

        .toggle-on-friends {
          animation-name: chattingOn-friends;
          animation-duration: 0.5s;
          animation-timing-function: ease;
          animation-fill-mode: forwards;
        }

        .toggle-off-friends {
          animation-name: chattingOff-friends;
          animation-duration: 0.5s;
          animation-timing-function: ease;
          animation-fill-mode: forwards;
        }

        @keyframes chattingOn-friends {
          from {
            left: -20rem;
          }
          to {
            left: 0rem;
          }
        }

        @keyframes chattingOff-friends {
          from {
            left: 0rem;
          }
          to {
            left: -20rem;
          }
        }

        button {
          position: absolute;
          top: 0px;
          right: 0px;
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
          right: -2rem;
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

        .span-anim-friends {
          animation-name: stoped-friends;
          animation-duration: 1s;
          animation-timing-function: ease;
          animation-fill-mode: forwards;
        }

        @keyframes stoped-friends {
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
