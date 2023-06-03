import Image from "next/image";
import Link from "next/link";

export default function TitleBar () {
  return (
    <>
      <nav className="flex justify-between items-center h-24">
        <section className="ml-10 flex justify-center items-center w-80 h-24" aria-label="Logo Area">
          <article><Link href={"/"}><button><Image src="/Logo.svg" width={592} height={96} alt="Logo of website" /> </button></Link></article>
        </section>
        <section className="flex w-fil" aria-label="Menu Area">
          <article className="ml-96 mr-20 text-xl font-bold"><Link href={"/intro"}><button>소개</button></Link></article>
          <article className="mx-20 text-xl font-bold"><Link href={"/notice"}><button>공지사항</button></Link></article>
          <article className="ml-20 mr-72 text-xl font-bold"><Link href={"/issue"}><button>이슈피드</button></Link></article>
        </section>
        <section className="flex m" aria-label="Personal Area">
          <article className="mx-2 font-bold"><Link href={"/shop"}><button>마켓</button></Link></article>
          <article className="mx-2 font-bold"><Link href={"/payment"}><button>충전하기</button></Link></article>
          <article className="mx-2 font-bold"><Link href={"/profile"}><button>닉네임다섯 [TYPE]</button></Link></article>
          <article className="ml-2 mr-5"><Link href={"/profile"}><button>프로필</button></Link></article>
          
        </section>
      </nav>
    </>
  );
}