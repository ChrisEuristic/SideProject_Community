/**
 * 클라이언트로부터 받은 request.url을 protocol, origin, path, posting No로 분해하여 리턴한다.
 * @param requestURL 
 * @returns 
 */
export function getURLInform(requestURL: string){
  const urlArr = requestURL.split("/");
  return {
    protocol: urlArr[0],
    origin: urlArr[2],
    path: "/".concat(urlArr[urlArr.length - 3], "/", urlArr[urlArr.length - 2]),
    postingNo: urlArr[urlArr.length - 1]
  }
}