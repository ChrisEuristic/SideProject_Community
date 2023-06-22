"use client";

import { IsOnProfilePopup } from "@/recoil/WindowAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import Image from "next/image";
import { SlideWindowState } from "@/recoil/WindowAtom";
import ProfilePopup from "./ProfilePopup";
import { IsAdmin } from "@/recoil/SignAtom";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Profile({ userName, userType, userImage }: any) {
  const [isOnProfilePopup, setIsOnProfilePopup] =
    useRecoilState(IsOnProfilePopup);
  const [isAdmin, setIsAdmin] = useRecoilState(IsAdmin);
  const { data: session } = useSession();

  function popup() {
    if (isOnProfilePopup === SlideWindowState.CLOSE || isOnProfilePopup === SlideWindowState.INIT) {
      setIsOnProfilePopup(SlideWindowState.OPEN);
    } else {
      setIsOnProfilePopup(SlideWindowState.CLOSE);
    }
  }

  useEffect(() => {
    (async function () {
      const res = await fetch(`https://www.eurekasolusion.shop/api/admin?email=${session?.user?.email}`);
      if(res.status === 200) {
        setIsAdmin(true);
      }
    })();
  }, [session?.user?.email, setIsAdmin]);

  return (
    <>
      <button
        onClick={() => {
          popup();
        }}
      >
        {isAdmin ? (
          <>
            <article className="admin-name">
              {userName} {userType}
            </article>
            <article className="admin-image">
              <Image src={userImage} alt="profile" width={50} height={50} />
            </article>
          </>
        ) : (
          <>
            <article className="user-name">
              {userName} {userType}
            </article>
            <article className="user-image">
              <Image src={userImage} alt="profile" width={50} height={50} />
            </article>
          </>
        )}
        <ProfilePopup />
      </button>
      <style jsx>{`
        button {
          display: flex;
          width: 10vw;
          justify-content: space-evenly;
          align-items: center;
        }
        .user-image {
          width: 2.5rem;
          height: 2.5rem;
          border: 1px solid #141414;
          border-radius: 50%;
          box-sizing: border-box;
          overflow: hidden;
        }
        .admin-name {
          background-color: #ff6666;
          color: white;
          padding: 0 0.5vw;
          border-radius: 3px;
          animation-name: admin-blink;
          animation-duration: 0.3s;
          animation-iteration-count: infinite;
        }
        .admin-image {
          width: 2.5rem;
          height: 2.5rem;
          border: 2px solid #ff6666;
          border-radius: 50%;
          box-sizing: border-box;
          overflow: hidden;
          animation-name: admin-blink;
          animation-duration: 0.3s;
          animation-iteration-count: infinite;
        }

        @keyframes admin-blink {
          from{
            box-shadow: #FF6666 0px 0px 10px;
          }
          50% {
            box-shadow: #FF6666 0px 0px 2px;
          }
          to {
            box-shadow: #FF6666 0px 0px 10px;
          }
        }
      `}</style>
    </>
  );
}
