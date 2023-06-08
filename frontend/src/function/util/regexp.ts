/**
 * ## 정규식으로 str 내 substr이 포함되어있는지 확인
 * @param str 전체 문자열
 * @param substr 포함되어있는지 확인하는 문자열
 * @returns 
 */
export function checkSubString(str: string, substr: string){
  const pattern = new RegExp(substr);
  return pattern.test(str);
}