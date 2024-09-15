import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/enums/CacheEnum'

/**
 * 获取时间戳
 */
export function getTimeStamp(): string | null {
  return localStorage.getItem(TIME_STAMP)
}
/**
 * 设置时间戳
 */
export function setTimeStamp(): void {
    localStorage.setItem(TIME_STAMP, Date.now().toString())
}
/**
 * 是否超时
 */
export function isCheckTimeout():boolean  {
  // 当前时间戳
  var currentTime: number = Date.now()
  // 缓存时间戳
  const timeStamp: number = parseInt(getTimeStamp() || '0', 10);
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
