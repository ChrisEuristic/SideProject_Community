import Link from "next/link";

export default function TitleBar () {
  return (
    <>
      <nav className="flex justify-between items-center h-24">
        <section className="ml-5 flex justify-center items-center w-52 h-24" aria-label="Logo Area">
          <article><Link href={"/dashboard"}><button>로고 영역</button></Link></article>
        </section>
        <section className="flex w-fil" aria-label="Menu Area">
          <article className="ml-96 mr-20 text-xl font-bold"><button>소개</button></article>
          <article className="mx-20 text-xl font-bold"><Link href={"/notice"}><button>공지사항</button></Link></article>
          <article className="ml-20 mr-72 text-xl font-bold"><button>이슈 피드</button></article>
        </section>
        <section className="flex m" aria-label="Personal Area">
          <article className="mx-2 font-bold"><button>마켓</button></article>
          <article className="mx-2 font-bold"><button>충전하기</button></article>
          <article className="mx-2 font-bold"><button>닉네임다섯 [TYPE]</button></article>
          <article className="ml-2 mr-5"><button>프로필 사진</button></article>
        </section>
      </nav>
    </>
  );
}