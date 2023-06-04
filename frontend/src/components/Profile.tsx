"use client";

import { IsOnProfilePopup } from "@/recoil/WindowAtom";
import { useRecoilState } from "recoil";
import Image from "next/image";
import { SlideWindowState } from "@/recoil/WindowAtom";
import ProfilePopup from "./ProfilePopup";

export default function Profile({ userName, userType, userImage }: any) {
  const [isOnProfilePopup, setIsOnProfilePopup] =
    useRecoilState(IsOnProfilePopup);

  function popup() {
    if(isOnProfilePopup === SlideWindowState.CLOSE){
      setIsOnProfilePopup(SlideWindowState.OPEN);
    } else {
      setIsOnProfilePopup(SlideWindowState.CLOSE);
    }
  }
  return (
    <>
      <button
        onClick={() => {
          popup();
        }}
      >
        <article id="user-name">
          {userName} {userType}
        </article>
        <article id="user-image">
          <Image src={userImage} alt="profile" width={50} height={50} />
        </article>
        <ProfilePopup />
      </button>
      <style jsx>{`
        button {
          display: flex;
          width: 10vw;
          justify-content: space-evenly;
          align-items: center;
        }
        #user-image {
          width: 2.5rem;
          height: 2.5rem;
          border: 1px solid #141414;
          border-radius: 50%;
          box-sizing: border-box;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
