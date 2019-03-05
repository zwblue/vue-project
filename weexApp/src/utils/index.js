
export function parseTime (time, cFormat = '{y}-{m}-{d} {h}:{i}:{s}') {
  // 1、如果返回的是秒*1000 并且要转成时间格式  new Date(parseInt(time))
  // 2、如果传入的直接是时间格式new Data() 就不需要转
  // 3、
  if (arguments.length === 0) {
    return null
  }
  if (String(time).length === 10) {
    time = +time * 1000
  }
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timestr = cFormat.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['日', '一', '二', '三', '四', '五', '六'][value]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timestr
}

// 数据格式化
export function parseData (listData, dataKey = 'Data', fieldKey = 'Field', needKey = []) {
  const newListData = []
  const data = listData[dataKey]
  const field = listData[fieldKey]
  data.forEach((element, eleIndex) => {
    const obj = {}
    element.forEach((item, index) => {
      const keyValue = field[index]
      if (needKey && needKey.length > 0) {
        // 只转换需要的key值
        if (needKey.indexOf(keyValue) >= 0) {
          obj[keyValue] = item
        }
      } else {
        // 全部对应的key都转换过来
        obj[keyValue] = item
      }
    })
    newListData[eleIndex] = obj
  })
  return newListData
}
