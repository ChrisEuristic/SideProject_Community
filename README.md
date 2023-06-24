# SideProject Who-ami
스킬 점검 및 간단한 유료서비스를 위한 웹사이트 개발.

> [트러블슈팅 정리](https://github.com/ChrisEuristic/SideProject_Community/blob/main/TroubleShooting.md)

## 프로젝트 단계

> - [x] 1. 프로젝트 기획
> - [x] 2. 시스템 아키텍쳐 설계
> - [x] 3. 모바일 화면 설계
> - [x] 4. 데스크톱 화면 설계
> - [x] 5. 기술 스택 결정
> - [x] 6. 프로토타이핑
> - [ ] 7. 테스트 주도 개발
> - [x] 8. 배포
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
>> - [x] 게시판 오버뷰 기능(공지사항 전용)
>> - [x] 게시판 컨텐츠뷰 기능(공지사항 전용)
>> - [ ] 게시물 검색 기능(공지사항 전용)
>> - [x] 게시글 포스팅(공지사항 전용)
>> - [x] 게시글 수정/삭제(공지사항 전용)
>> - [ ] MarkDown 에디터로 만들기(공지사항 전용)
> - [x] 댓글 기능(공지사항 전용)
>> - [x] 비회원일땐 댓글 입력창 없이 볼수만 있음(공지사항 전용)
>> - [x] 로그인 시 댓글 입력창 노출(공지사항 전용)
>> - [ ] 본인이 남긴 댓글은 수정 및 삭제 가능(공지사항 전용)
> - [x] 피드 기능
>> - [x] 대시보드에 실시간 피드 업데이트
>> - [ ] 해시태그 필터 기능
>> - [x] 피드 작성 기능
> - [ ] 좋아요 기능
>> - [ ] 메인 페이지 좋아요 노출
>> - [ ] 상세 페이지 좋아요 노출
>> - [ ] 회원은 좋아요 누를 수 있음
>> - [ ] 비회원은 좋아요 누를 시 로그인 안내 메시지
> - [x] 페이징 기능(공지사항 전용)
>> - [x] 한 페이지에 ~~5~~ 10개 포스팅만 노출
>> - [x] 페이지 수에 따라 이전, 다음 버튼 생성 구현
> - [ ] 친구 목록
>> - [x] 친구 창 만들기
>> - [ ] 친구 목록 불러오기 기능
>> - [ ] 인터랙션 기능
>> - [ ] 인터랙션 - 서비스 권유 기능
>> - [ ] 인터랙션 - 친구의 상태 읽기
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
<img src="https://img.shields.io/badge/-Next.JS 13.4.2-000000?logo=next.js&logoColor=white">  <img src="https://img.shields.io/badge/-TypeScript 5.0.4-3178C6?logo=typescript&logoColor=white">  <img src="https://img.shields.io/badge/-Node.js 18.16.0-339933?logo=node.js&logoColor=white">  <img src="https://img.shields.io/badge/-Express.js 4.18.2-4479A1?logo=express&logoColor=white">  <img src="https://img.shields.io/badge/-MySQL 8.0(Develop)-4479A1?logo=mysql&logoColor=white">  <img src="https://img.shields.io/badge/-postgreSQL(Vercel Production)-4169E1?logo=postgresql&logoColor=white"> 

#### Package Manager
<img src="https://img.shields.io/badge/-npm-CB3837?logo=npm&logoColor=white">

#### Foundation Design
<img src="https://img.shields.io/badge/-Figma-F24E1E?logo=figma&logoColor=white">

#### Status Management
<img src="https://img.shields.io/badge/-Recoil-4169E1?logo=relay&logoColor=white">
<img src="https://img.shields.io/badge/-Redux Toolkit(Before)-764ABC?logo=redux&logoColor=white">

#### UI Kit / Styling
<img src="https://img.shields.io/badge/-Tailwind 3.3.2-06B6D4?logo=tailwindcss&logoColor=white">  <img src="https://img.shields.io/badge/-React Icons-61DAFB?logo=react&logoColor=white">

#### Testing
<img src="https://img.shields.io/badge/-Jest-C21325?logo=jest&logoColor=white">

#### Building
<img src="https://img.shields.io/badge/-Webpack-8DD6F9?logo=webpack&logoColor=white">

#### Deploying
<img src="https://img.shields.io/badge/-Vercel-000000?logo=vercel&logoColor=white"> <img src="https://img.shields.io/badge/-Amazon AWS-232F3E?logo=amazonaws&logoColor=white">

---

## 프로젝트 컨벤션
```javascript
/* Camel Case */
/* variable, function */
/* No var */
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


## 프로젝트 구조

| Part | Root | level1 | level2 | level3 | level4 | level5 | level6 | level7 | level8 | level9 | level10 |
|:-----:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Front | src | app | 메인 페이지, Navbar |
|       |     | app | intro | 소개 페이지 |
|       |     | app | issue | 이슈피드 페이지 |
|       |     | app | notice | 공지사항 페이지 |
|       |     | app | payment | 결제 페이지 |
|       |     | app | profile | 프로필 페이지 |
|       |     | app | shop | 마켓 페이지 |
|       |     | components | 위치 미지정 컴포넌트 |
|       |     | function | database | DB 함수 |
|       |     |          | gpt      | Chatbot 기능 |
|       |     |          | util     | 클라/서버 함수 |
|       |     | recoil | 아톰 파일 |
|       |     | test | 테스트 파일 |
| Back  | src | 서버 파일 |
| Back  | src | Feed 버퍼 파일 |
| Back  | src | api | api 파일 |
| Back  | src | function | MySQL 함수 파일 |
| Back  | src | function | 유틸리티 함수 파일 |
| Back  | src | test | 테스트파일 |
