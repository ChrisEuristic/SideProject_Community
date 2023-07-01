"use client";

import Feed from "@/components/Feed";
import FeedInputBox from "@/components/FeedInputBox";
import HashTagFilter from "@/components/HashTagFilter";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import socket from "socket.io-client";

export default function Home() {
  const { data: session } = useSession();
  const personalTypes = [
    "INFP",
    "ENFP",
    "ISFP",
    "ESFP",
    "INTP",
    "ENTP",
    "ISTP",
    "ESTP",
    "INFJ",
    "ENFJ",
    "ISFJ",
    "ESFJ",
    "INTJ",
    "ENTJ",
    "ISTJ",
    "ESTJ",
  ];
  const [hashTagFilters, setHashTagFilters] = useState(
    personalTypes.map((personalType, index) => {
      return <HashTagFilter key={personalType} type={personalType} />;
    })
  );

  const [feeds, setFeeds] = useState<
    {
      feedID: string;
      userImage: string;
      userName: string;
      feedContent: string;
      regidate: string;
      hashTag: string;
    }[]
  >();
  const [feedsView, setFeedsView] = useState<JSX.Element[]>();
  const [feedInputBoxView, setFeedInputBoxView] = useState<JSX.Element>();

  useEffect(() => {
    const clientIO = socket("https://www.eurekasolusion.shop", {
      // !: Dev 전용 설정. 보안상 매우 위험
      rejectUnauthorized: false,
    });

    // 연결 에러 처리
    clientIO.on("connect_error", (error) => {
      console.error("socket Error", error);
    });

    // 메인 채널로부터 피드 버퍼 받음.
    clientIO.on("loading-feeds", (feedBuffer) => {
      setFeeds(JSON.parse(feedBuffer));
    });

    function submitFeed(feedContent: string) {
      clientIO.emit(
        "new-feed",
        JSON.stringify({
          userImage: session?.user?.image,
          userName: session?.user?.name,
          feedContent: feedContent ?? "",
          regidate: String(new Date()),
          hashTag: "#XXXX",
        })
      );
    }

    setFeedInputBoxView(<FeedInputBox submitFeed={submitFeed} />);

    return () => {
      clientIO.disconnect();
    };
  }, [session?.user?.image, session?.user?.name]);

  useEffect(() => {
    if (feeds) {
      // !: 윗 이펙트에 구현하면 무한루프 발생. 절대 이동 금지.
      console.log(feeds);

      if (feeds) {
        let tempArr = feeds
          .map((feed, index) => {
            return (
              <Feed
                key={feed.feedID}
                userImage={feed.userImage}
                userName={feed.userName}
                feedContent={feed.feedContent}
                regidate={feed.regidate}
                hashTag={feed.hashTag}
              />
            );
          })
          .reverse();

          

        setFeedsView(tempArr);
      }
    }
  }, [feeds]);

  return (
    <>
      <div>
        <Link href={"/test"}>
          <aside>서비스로 이동</aside>
        </Link>
        <nav>{hashTagFilters}</nav>
        <main>
          {feedInputBoxView}
          {feedsView}
        </main>
      </div>
      <style jsx>{`
        @media (min-width: 1024px) {
          div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: 90vh;
          }
          aside {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 60vw;
            height: 10vh;
            border: solid 1px #141414;
            border-radius: 5px;
          }
          nav {
            display: flex;
            align-items: center;
            overflow-x: scroll;
            width: 60vw;
            height: 5vh;
            border: solid 1px #141414;
            border-radius: 5px;
            padding: 0 0.5vw;
          }
          main {
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
            width: 60vw;
            height: 75vh;
            border: solid 1px #141414;
            border-radius: 5px;
            overflow-y: scroll;
          }
        }

        @media (max-width: 767px) {
          aside {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: 20vh;
            border: solid 1px #141414;
            border-radius: 5px;
          }
          nav {
            display: flex;
            align-items: center;
            overflow-x: scroll;
            width: 100vw;
            height: 10vh;
            border: solid 1px #141414;
            border-radius: 5px;
            padding: 0 0.5vw;
          }
          nav::-webkit-scrollbar {
            width: 0;
            height: 0;
          }
          main {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow-y: scroll;
            width: 100vw;
            height: 75vh;
            border: solid 1px #141414;
            border-radius: 5px;
          }
          main::-webkit-scrollbar {
            width: 0;
            height: 0;
          }
        }
      `}</style>
    </>
  );
}
