//引入dayjs日期插件
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)
const now = dayjs();


/**
 * Check if an element has a class
 * @param {HTMLElement} ele
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele: HTMLElement, cls: string) {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * Add class to element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function addClass(ele: HTMLElement, cls: string) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function removeClass(ele: HTMLElement, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}

/**
 * 判断是否是外部链接
 *
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path);
  return isExternal;
}


// 获取今天的开始时间（00:00:00）
export const getStartOfDay = () => {
  return dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
}

// 获取今天的结束时间（23:59:59）
export const getEndOfDay = () => {
  return dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss');
}

/**
 * 时间方法
 */
export const getDateRange = (type: string,format:string ='')=> {
  switch (type) {
    case 'today':
      return {
        start: now.startOf('day').format(format),
        end: now.endOf('day').format(format),
      };
    case 'yesterday':
      return {
        start: now.subtract(1, 'day').startOf('day').format(format),
        end: now.subtract(1, 'day').endOf('day').format(format),
      };
    case 'lastSevenDays':
      return {
        start: now.subtract(7, 'day').startOf('day').format(format),
        end: now.subtract(1, 'day').endOf("day").format(format),
      };
    case 'currentMonth':
      return {
        start: now.startOf('month').format(format),
        end:now.endOf("month").format(format)
      };
    case 'lastMonth':
      return {
        start: now.subtract(1, 'month').startOf('month').format(format),
        end: now.subtract(1, 'month').endOf('month').format(format),
      };
    default:
      return {
        start: now.format(format),
        end: now.add(1, 'day').format(format),
      };
  }
}

// 针对日期 如 2023-11-11 00:00:00 转为 2023-11-10 23:59:59
export const getDayFomat = (time: string, format: string = '') => {
  return dayjs(time).subtract(0, 'day').format(format);
}

// 使用正则表达式格式化成UTC时间
export const utcFormat = (time: string,format:string = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(time).format(format).replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/, '$1-$2-$3T$4:$5:$6.000Z');
}

