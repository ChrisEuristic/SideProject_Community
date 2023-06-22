"use client";

import { useState, useRef } from "react";
import { RiSendPlaneFill } from "react-icons/ri";

export default function FeedInputBox({ submitFeed }: { submitFeed: Function }) {
  const [mainClassName, setMainClassName] = useState("");
  const [submitClassName, setSubmitClassName] = useState("");
  const inputBox = useRef<HTMLTextAreaElement>(null);

  function enter(e: any) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendAction();
    }
  }

  function sendAction() {
    const feedLength = inputBox.current?.value.length ?? 0;

    if (feedLength >= 5 && feedLength < 500) {
      submitFeed(inputBox.current?.value);
      setMainClassName("send-feed");
      inputBox.current!.value = "";
    } else {
      alert("피드는 5자 이상, 500자 미만으로 작성해주세요.");
    }
  }
  return (
    <>
      <main className={mainClassName}>
        <textarea
          ref={inputBox}
          onKeyDown={enter}
          placeholder="아무 말이나 적어"
        ></textarea>
        <section>
          <button className={submitClassName} onMouseOver={() => {setSubmitClassName("feed-button-mouseover")}} onMouseLeave={() => {setSubmitClassName("feed-button-mouseleave")}} onClick={sendAction}>
            <RiSendPlaneFill fontSize={"1.2rem"} />
          </button>
        </section>
      </main>
      <style jsx>{`
        @media (min-width: 1024px) {
          main {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 50vw;
            height: 15vh;
            border: solid 1px #141414;
            border-radius: 1vw;
            background-color: white;
            padding: 1.5vh 1vw 1vh 1vw;
            margin: 2vh 0 1vh 0;
          }
          textarea {
            width: 48vw;
            height: 8vh;
          }
          section {
            width: 48vw;
            height: 2rem;
            display: flex;
            justify-content: right;
          }
          article {
            width: 6vw;
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
            from{
              background-color: rgba(0, 0, 0, 0);
            }
            to {
              background-color: rgba(0, 0, 0, 0.2);
            }
          }
          @keyframes feed-button-anim-off {
            from{
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
