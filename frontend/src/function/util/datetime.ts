/**
 * 
 * @param date 
 * @returns yyyy-MM-dd hh:mm:ss
 */
export function formatDateTime(date: Date){
  const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
}