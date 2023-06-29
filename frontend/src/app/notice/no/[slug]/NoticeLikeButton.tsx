"use client";

import { useState, useEffect } from "react";
import { AiFillLike } from "react-icons/ai";

export default function NoticeLikeButton({
  postingNo,
  userID,
  isLikeThis,
  setIsLikeThis,
}: {
  postingNo: string;
  userID: string;
  isLikeThis: boolean;
  setIsLikeThis: Function;
}) {
  const [buttonStyle, setButtonStyle] = useState<{
    backgroundColor: string;
    borderRadius: string;
    marginTop: string;
    padding: string;
    color: string;
  }>();

  async function pressLikeButton() {
    if (isLikeThis) {
      fetch(
        `https://www.eurekasolusion.shop/api/islikethis?postingno=${postingNo}&userid=${userID}`,
        {
          method: "DELETE",
        }
      );

      setIsLikeThis(false);
    } else {
      console.debug(postingNo, userID);
      fetch(`https://www.eurekasolusion.shop/api/islikethis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postingno: postingNo,
          userid: userID,
        }),
      });

      setIsLikeThis(true);
    }
  }

  useEffect(() => {
    if (isLikeThis) {
      setButtonStyle({
        backgroundColor: "#282828",
        borderRadius: "0.3rem",
        marginTop: "0.5rem",
        padding: "0.4rem 0.7rem",
        color: "#FF5555",
      });
    } else {
      setButtonStyle({
        backgroundColor: "#282828",
        borderRadius: "0.3rem",
        marginTop: "0.5rem",
        padding: "0.4rem 0.7rem",
        color: "white",
      });
    }
  }, [isLikeThis]);

  return (
    <>
      <button style={buttonStyle} onClick={pressLikeButton}>
        <AiFillLike />
      </button>
    </>
  );
}
