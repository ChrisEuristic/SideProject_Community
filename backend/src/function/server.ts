/**
 * 클라이언트로부터 받은 request.url을 protocol, origin, path, posting No로 분해하여 리턴한다.
 * @param requestURL 
 * @returns 
 */
export function getPostingNo(requestURL: string){
  const urlArr = requestURL.split("/");
  return urlArr[urlArr.length - 1]
}