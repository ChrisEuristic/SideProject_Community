"use client";

import { useState } from "react";

export default function HashTagFilter({ type }: { type: string }) {
  const [isFiltered, setIsFiltered] = useState(false);
  const [mainClassName, setMainClassName] = useState("");

  // TODO: type 변수와 isFiltered 변수를 오브젝트로 묶어서 필터 기능 적용하면 될듯.

  return (
    <>
      <main
        onMouseOver={() => {
          setMainClassName("hash-button-mouseover");
        }}
        onMouseLeave={() => {
          setMainClassName("hash-button-mouseleave");
        }}
        onClick={() => {
          setIsFiltered((pre) => !pre);
          if(isFiltered){
            setMainClassName("");

          }
        }}
        className={`${String(isFiltered)} ${mainClassName}`}
      >
        #{type}
      </main>
      <style jsx>{`
        @media (min-width: 1024px) {
          main {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 4vw;
            min-width: 4vw;
            height: 3vh;
            font-size: 0.7vw;
            border: solid 1px #141414;
            border-radius: 1.33vw;
            margin: 0.5vh 0.5vw;
            cursor: pointer;
            user-select: none;
          }

          .true {
            background-color: #141414;
            color: white;
          }

          .false {
            background-color: white;
            color: #141414;
          }
        }
        @media (max-width: 767px) {
          main {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20vw;
            min-width: 20vw;
            height: 5vh;
            font-size: 5vw;
            border: solid 1px #141414;
            border-radius: 8vw;
            margin: 0 3vw;
            cursor: pointer;
          }

          .true {
            background-color: #141414;
            color: white;
          }

          .false {
            background-color: white;
            color: #141414;
          }
        }
        .hash-button-mouseover {
          animation-name: hash-button-anim-on;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }

        .hash-button-mouseleave {
          animation-name: hash-button-anim-off;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }

        @keyframes hash-button-anim-on {
          from {
            border-color: rgba(20, 20, 20, 1);
            background-color: rgba(0, 0, 0, 0);
            color: rgba(0, 0, 0, 1);
          }
          to {
            border-color: rgba(0, 0, 0, 0.5);
            background-color: rgba(0, 0, 0, 0.5);
            color: rgba(255, 255, 255, 1);
          }
        }
        @keyframes hash-button-anim-off {
          from {
            border-color: rgba(0, 0, 0, 0.5);
            background-color: rgba(0, 0, 0, 0.5);
            color: rgba(255, 255, 255, 1);
          }
          to {
            border-color: rgba(20, 20, 20, 1);
            background-color: rgba(0, 0, 0, 0);
            color: rgba(0, 0, 0, 1);
          }
        }
      `}</style>
    </>
  );
}
