"use client";

import { IsOnProfilePopup } from "@/recoil/WindowAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import Image from "next/image";
import { SlideWindowState } from "@/recoil/WindowAtom";
import ProfilePopup from "./ProfilePopup";
import { IsAdmin } from "@/recoil/SignAtom";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import styles from "./profile.module.css";

export default function Profile({ userName, userType, userImage }: any) {
  const [isOnProfilePopup, setIsOnProfilePopup] =
    useRecoilState(IsOnProfilePopup);
  const [isAdmin, setIsAdmin] = useRecoilState(IsAdmin);
  const { data: session } = useSession();

  function popup() {
    if (
      isOnProfilePopup === SlideWindowState.CLOSE ||
      isOnProfilePopup === SlideWindowState.INIT
    ) {
      setIsOnProfilePopup(SlideWindowState.OPEN);
    } else {
      setIsOnProfilePopup(SlideWindowState.CLOSE);
    }
  }

  useEffect(() => {
    (async function () {
      const res = await fetch(
        `https://www.eurekasolusion.shop/api/admin?email=${session?.user?.email}`
      );
      if (res.status === 200) {
        setIsAdmin(true);
      }
    })();
  }, [session?.user?.email, setIsAdmin]);

  return (
    <>
      <button className={styles.button}
        onClick={() => {
          popup();
        }}
      >
        {isAdmin ? (
          <>
            <article className={styles.adminName}>
              {userName} {userType}
            </article>
            <article className={styles.adminImage}>
              <Image src={userImage} alt="profile" width={50} height={50} />
            </article>
          </>
        ) : (
          <>
            <article>
              {userName} {userType}
            </article>
            <article className={styles.userImage}>
              <Image src={userImage} alt="profile" width={50} height={50} />
            </article>
          </>
        )}
        <ProfilePopup />
      </button>
    </>
  );
}
