/**
 *
 * @param date
 * @returns yyyy-MM-dd hh:mm:ss
 */
export function formatDateTime(date: Date) {
  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해줍니다.
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
}

export function whatTimesAgo(dateTime: Date | string) {
  const dateTimeDate = new Date(dateTime);
  const intervalSeconds = Math.floor(
    (new Date().getTime() - dateTimeDate.getTime()) / 1000
  );

  const intervalYears = Math.floor(intervalSeconds / 31536000)
  if (intervalYears) {
    return `${intervalYears}년 전`;
  }
  const intervalMonths = Math.floor(intervalSeconds / 2592000)
  if (intervalMonths) {
    return `${intervalMonths}달 전`;
  }
  const intervalDays = Math.floor(intervalSeconds / 86400)
  if (intervalDays) {
    return `${intervalDays}일 전`;
  }
  const intervalHours = Math.floor(intervalSeconds / 3600)
  if (intervalHours) {
    return `${intervalHours}시간 전`;
  }
  const intervalMinutes = Math.floor(intervalSeconds / 60)
  if (intervalMinutes) {
    return `${intervalMinutes}분 전`;
  }
  return `${intervalSeconds}초 전`;
}
