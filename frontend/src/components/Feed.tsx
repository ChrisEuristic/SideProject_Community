"use client";

import { whatTimesAgo } from "@/function/util/datetime";
import Image from "next/image";

export default function Feed({
  userImage,
  userName,
  feedContent,
  regidate,
  hashTag,
}: {
  userImage: string;
  userName: string;
  feedContent: string;
  regidate: string;
  hashTag: string;
}) {
  return (
    <>
      <main>
        <aside>
          <Image src={userImage} alt="user-profile-photo" style={{width:"5vh", height: "5vh", borderRadius: "50%"}} />{" "}
        </aside>
        <section>
          <div>
            <header>{userName}</header>
            <nav>{whatTimesAgo(regidate)}</nav>
          </div>
          <article>{feedContent}</article>
          <footer>{hashTag}</footer>
        </section>
      </main>
      <style jsx>{`
        main {
          width: 50vw;
          height: 10vh;
          display: flex;
          align-items: center; 
          border: solid 1px #141414;
          border-radius: 1vw;
          margin: 1vh 0;
          padding: 1vh 1vw;
        }

        section {
          width: 45vw;
          margin-left: 1vw;
        }

        div {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }

        header {
          font-weight: bold;
        }
      `}</style>
    </>
  );
}
