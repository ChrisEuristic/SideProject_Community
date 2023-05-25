"use client";

import { toggle } from "@/redux/features/chattoggle/chattoggleSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TbBrandHipchat } from "react-icons/tb";

export default function ChatNaviButton() {
  const setIsOnChatting = useAppDispatch();

  return (
    <>
      <button
        onClick={() => {
          setIsOnChatting(toggle());
        }}
      >
        <TbBrandHipchat />
      </button>
      <style jsx>{`
        button {
          position: fixed;
          right: 1rem;
          bottom: 1rem;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 3rem;
        }
        button:hover {
          right: 1.05rem;
          bottom: 1.05rem;
        }
        button:active {
          right: 1rem;
          bottom: 1rem;
        }
      `}</style>
    </>
  );
}
