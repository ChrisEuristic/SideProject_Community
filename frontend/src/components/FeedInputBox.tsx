"use client";

import { useState, useRef } from "react";
import { RiSendPlaneFill } from "react-icons/ri";

export default function FeedInputBox({ submitFeed }: { submitFeed: Function }) {
  const [className, setClassName] = useState("");
  const inputBox = useRef<HTMLInputElement>(null);

  function sendAction() {
    submitFeed(inputBox.current?.value);
    setClassName("send-feed");
  }
  return (
    <>
      <main className={className}>
        <input type="text" ref={inputBox}/>
        <button onClick={sendAction}>
          <RiSendPlaneFill fontSize={"1.2rem"} />
        </button>
      </main>
      <style jsx>{`
        @media (min-width: 1024px) {
          main {
            position: absolute;
            bottom: 2vh;
            right: 25vw;
            display: flex;
            align-items: center;
            width: 50vw;
            height: 4vh;
            border: solid 1px #141414;
            border-radius: 10vw;
            background-color: white;
            padding-left: 1vw;
          }
          input {
            width: 47vw;
          }
          button {
            position: absolute;
            right: 0.5vw;
          }

          .send-feed {
            animation-name: send-action;
            animation-duration: 0.5s;
            animation-timing-function: ease;
            animation-fill-mode: forwards;
          }
        }

        @keyframes send-action {
          from {
            width: 50vw;
          }
          to {
            width: 4vh;
          }
        }
      `}</style>
    </>
  );
}
