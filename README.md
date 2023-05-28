# SideProject_Community
개인적인 기록을 위한 웹사이트를 만들어봅니다.

## 프로젝트 단계

> - [x] 1. 프로젝트 기획
> - [x] 2. 시스템 아키텍쳐 설계
> - [x] 3. 모바일 화면 설계
> - [x] 4. 데스크톱 화면 설계
> - [x] 5. 기술 스택 결정
> - [ ] 6. 프로토타이핑
> - [ ] 7. 테스트 주도 개발
> - [ ] 8. 배포
> - [ ] 9. 최적화
> - [ ] 10. 유지보수
> - [ ] *. 회고


---
## 기능 목록
> - [ ] 로그인 / 회원가입
>> - [ ] 닉네임 중복 확인
>> - [ ] 비밀번호를 두 번 입력받아 일치여부 확인
>> - [ ] 비밀번호 암호화
>> - [ ] 마이 페이지
>> - [ ] 프로필에서 닉네임, 비밀번호 수정 기능
>> - [ ] 회원 탈퇴(회원 데이터 삭제)
> - [ ] 포스팅 / 뷰 기능
>> - [x] 게시판 뷰 기능(공지사항 전용)
>> - [ ] 게시물 검색 기능(공지사항 전용)
>> - [x] 게시글 포스팅(공지사항 전용)
>> - [ ] 게시글 수정/삭제(공지사항 전용)
>> - [ ] MarkDown 에디터로 만들기(공지사항 전용)
> - [ ] 댓글 기능(공지사항 전용)
>> - [ ] 비회원일땐 댓글 입력창 없이 볼수만 있음(공지사항 전용)
>> - [ ] 로그인 시 댓글 입력창 노출(공지사항 전용)
>> - [ ] 본인이 남긴 댓글은 수정 및 삭제 가능(공지사항 전용)
> - [ ] 피드 기능
>> - [ ] 대시보드에 실시간 피드 업데이트
>> - [ ] 해시태그 필터 기능
>> - [ ] 피드 작성 기능
> - [ ] 좋아요 기능
>> - [ ] 메인 페이지 좋아요 노출
>> - [ ] 상세 페이지 좋아요 노출
>> - [ ] 회원은 좋아요 누를 수 있음
>> - [ ] 비회원은 좋아요 누를 시 로그인 안내 메시지
> - [ ] 페이징 기능(공지사항 전용)
>> - [ ] 한 페이지에 5개 포스팅만 노출
>> - [ ] 페이지 수에 따라 이전, 다음 버튼 생성 구현
> - [ ] 친구 목록 인터랙션 기능
>> - [ ] 친구에게 서비스 권유 기능
>> - [ ] 친구의 상태 읽기
> - [ ] 스레드 채팅 기능
>> - [ ] 피드에서 채팅으로 연결
>> - [x] 채팅창 ON/OFF 토글 애니메이션 구현 + 고정 기능 추가
> - [ ] 분석 서비스 기능
>> - [ ] 개인 분석 서비스 기능
>> - [ ] 연인 분석 서비스 기능
>> - [ ] 친구 목록 선택 어드바이스 서비스 기능
> - [ ] 결제 서비스 기능
>> - [ ] 계정 귀속 전용 화폐(충전)


## Skill Stack

#### Core
<img src="https://img.shields.io/badge/-Next.JS 13.4.2-000000?logo=next.js&logoColor=white">  <img src="https://img.shields.io/badge/-TypeScript 5.0.4-3178C6?logo=typescript&logoColor=white">  <img src="https://img.shields.io/badge/-MySQL 8.0-4479A1?logo=mysql&logoColor=white">  <img src="https://img.shields.io/badge/-Node.js 18.16.0-339933?logo=node.js&logoColor=white">  <img src="https://img.shields.io/badge/-Express.js 4.18.2-4479A1?logo=express&logoColor=white"> 

#### Package Manager
<img src="https://img.shields.io/badge/-npm-CB3837?logo=npm&logoColor=white">

#### Foundation Design
<img src="https://img.shields.io/badge/-Figma-F24E1E?logo=figma&logoColor=white">

#### Status Management
<img src="https://img.shields.io/badge/-Redux Toolkit-764ABC?logo=redux&logoColor=white">

#### UI Kit / Styling
<img src="https://img.shields.io/badge/-Tailwind 3.3.2-06B6D4?logo=tailwindcss&logoColor=white">  <img src="https://img.shields.io/badge/-React Icons-61DAFB?logo=react&logoColor=white">

#### Testing
<img src="https://img.shields.io/badge/-Jest-C21325?logo=jest&logoColor=white">

#### Building
<img src="https://img.shields.io/badge/-Webpack-8DD6F9?logo=webpack&logoColor=white">

#### Deploying
<img src="https://img.shields.io/badge/-Vercel-000000?logo=vercel&logoColor=white">

---

## 프로젝트 컨벤션
```javascript
/* Camel Case */
/* variable, function */
/* No var, No let */
/* 반드시 세미콜론으로 라인 마감 */
const varName = "camelCase";
function funcName () {...};

/* Pascal Case */
/* Component, interface, type */
export default function Component () {...};
interface InterfaceName = {...};
type TypeName = {...};

/* Dir, File Name */
/* directory : Lower case */
/* exportFunction.ts : Camel Case */
/* ExportComponent.tsx : Pascal Case */
/* style.css : Camel Case */
```


## 프로젝트 구조 및 기능 명세

Frontend
src(root)
  - app
      - api
          - (private)
        - dashboard
        - page.tsx
      - intro
        - page.tsx (SSR)
      - issue
        - page.tsx (SSR + CSR)
      - notice
        - writing
          - page.tsx (CSR)
        - no/[slug]
          - page.tsx (SSR)
        - page.tsx (SSR)
      - payment
        - page.tsx (SSR + CSR)
      - profile
        - page.tsx
      - shop
        - [...slug]
          - page.tsx (SSR + CSR)
        - page.tsx (SSR + CSR)
      - test
        - page.tsx (SSR + CSR)
      - page.tsx (SSR)
      - layout.tsx (SSR)
      - loading.tsx (CSR)
      - error.tsx (CSR)
      - TitleBar.tsx (SSR)
      - FriendBar.tsx (CSR)
      - ChatWindow.tsx (CSR)
      - ChatNaviButton.tsx (CSR)
  - function
      - gpt
          - chat.ts
      - util
          - database.ts
              - ```getConnection(): Promise<Connection>```
              - ```killConnection(Connection): Promise<void>```
  
  - redux
      - features
          - chattoggle
              - chattoggleSlice.ts
      - hooks.ts
      - provider.tsx
      - store.ts
