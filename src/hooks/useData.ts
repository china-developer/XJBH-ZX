import { utcFormat } from "@/utils/index";

// 参数处理函数，用于day参数分离未star和end,并格式化为当前时间固定UTC格式
export function handleData(queryInfo: any) {
  let data = { ...queryInfo };
  let newData = {}; // 初始化newData变量

  // 判断对象是否有day键，且数组长度大于1
  if (
    data.hasOwnProperty("day") &&
    Array.isArray(data.day) &&
    data.day.length > 1
  ) {
    if (data.hasOwnProperty("useless")) {
      // 把useless属性删除
      delete data.useless;
    }
    // 创建新的数据对象
    let { day, ...rest } = Object.assign(
      {
        start: data.day[0],
        end: data.day[1],
      },
      data
    );
    newData = {
      ...rest,
      start: utcFormat(data.day[0]),
      end: utcFormat(data.day[1]),
    };
  }
  //  else if (data.hasOwnProperty("day") && !Array.isArray(data.day)) {
  //  不是数组，且day存在
  // }
  else {
    if (data.hasOwnProperty("useless")) {
      // 把useless属性删除
      delete data.useless;
      newData = data; // 如果条件不满足，将原始数据赋值给newData
    } else {
      newData = data; // 如果条件不满足，将原始数据赋值给newData
    }
  }
  return newData;
}
