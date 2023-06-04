import { cookies } from "next/dist/client/components/headers";

/**
 * ## Client Side Function
 * ### 클라이언트 웹 브라우저 환경 여부 체크하여 callback 함수 실행
 * @param callback 클라이언트 웹 브라우저 환경에서 실행할 콜백함수
 * @returns true - 클라이언트 웹 브라우저 환경
 * @returns false - 서버 환경
 */
export function doInBrowser(callback: Function) {
  if (typeof window !== "undefined") {
    return callback();
  } else {
    return "doInBrowser log >> 서버에서 실행되었음";
  }
}

/**
 * ## Client Side Function
 * ### 임의의 라우팅 경로로 하드 라우팅
 * @param path 하드 라우팅을 하고자 하는 경로
 */
export function goto(path: string) {
  doInBrowser(() => {
    window.location.href = path;
  });
}

/**
 * ## Client Side Function
 * ### 로컬 스토리지, 세션 스토리지, 쿠키 모두 삭제.
 */
export function clearSignLog(): boolean {
  return doInBrowser(() => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      clearCookies([
        "next-auth.session-token",
        "next-auth.callback-url",
        "next-auth.csrf-token",
      ]);
      return true;
    } catch (error) {
      console.log("clearSignLog >> ", error);
      return false;
    }
  });
}

/**
 * ## Client Side Function
 * @param name 쿠키의 Key
 * @returns 쿠키의 Value
 */
export function getCookie(name: string): string {
  return doInBrowser(() => {
    const cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(`${name}=`) === 0) {
        return cookie.substring(`${name}=`.length, cookie.length);
      }
    }
  });
}

/**
 * ## Client Side Function
 * @param name 삭제하려는 쿠키의 key
 * @returns 삭제 성공시 true, 실패시 false
 */
export function clearCookie(name: string): boolean {
  return doInBrowser(() => {
    try {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      return true;
    } catch (error) {
      console.log("clearCookie Error >> ", error);
      return false;
    }
  });
}

/**
 * ## Client Side Function
 * @param names 삭제하려는 쿠키들의의 key Array
 * @returns [삭제 성공 수, 삭제 실패 수]
 */
export function clearCookies(names: string[]): [number, number] {
  let clearCount = 0;
  let errorCount = 0;

  return doInBrowser(() => {
    try {
      for (let cookie of names) {
        document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
      clearCount++;
    } catch (error) {
      console.log("clearCookies Error >> ", error);
      errorCount++;
    } finally {
      return [clearCount, errorCount];
    }
  });
}
