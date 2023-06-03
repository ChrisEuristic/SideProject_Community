/**
 * 클라이언트 웹 브라우저 환경 여부 체크하여 callback 함수 실행
 * @param callback 클라이언트 웹 브라우저 환경에서 실행할 콜백함수
 * @returns true - 클라이언트 웹 브라우저 환경
 * @returns false - 서버 환경
 */
export function doInBrowser(callback: Function){
  if(typeof window !== 'undefined'){
    callback();
    return true;
  } else {
    return false;
  }
}

/**
 * #### 임의의 라우팅 경로로 하드 라우팅
 * @param path 하드 라우팅을 하고자 하는 경로
 */
export function goto(path: string){
  doInBrowser(() => {
    window.location.href = path;
  });
}