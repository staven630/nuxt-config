//获取当前时间戳
export const getUnix = date => {
  date = date instanceof Date ? date : date ? new Date(date) : new Date()
  return date.getTime()
}

//获取今天0点0分0秒的时间戳
export const getTodayUnix = date => {
  date = date instanceof Date ? date : date ? new Date(date) : new Date()
  date.setHours(0, 0, 0, 0)
  return date.getTime()
}

export const formatDate = (datetime = '', format = 'YYYY-MM-DD HH:mm') => {
  if (!datetime) {
    datetime = new Date()
  } else if (typeof datetime == 'string') {
    datetime = datetime.replace(/\-/g, '/')
    datetime = new Date(datetime)
  } else if (typeof datetime == 'number') {
    datetime = new Date(datetime)
  } else if (!(datetime instanceof Date)) {
    datetime = new Date()
  }

  const padDate = time => (time < 10 ? '0' + time : time)
  const week = ['日', '一', '二', '三', '四', '五', '六']
  return format.replace(/YYYY|YY|MM|DD|HH|hh|mm|SS|ss|week/g, function(key) {
    switch (key) {
      case 'YYYY':
        return datetime.getFullYear()
      case 'YY':
        return (datetime.getFullYear() + '').slice(2)
      case 'MM':
        return padDate(datetime.getMonth() + 1)
      case 'DD':
        return padDate(datetime.getDate())
      case 'HH':
      case 'hh':
        return padDate(datetime.getHours())
      case 'mm':
        return padDate(datetime.getMinutes())
      case 'SS':
      case 'ss':
        return padDate(datetime.getSeconds())
      case 'week':
        return week[datetime.getDay()]
    }
  })
}

export const getDateStr = (date, format = 'YYYY-MM-DD') => {
  date = date instanceof Date ? date : date ? new Date(date) : new Date()
  const now = getUnix()
  const today = getTodayUnix()
  const timestamp = getUnix(date)
  const timer = (now - timestamp) / 1000
  let tip = ''
  if (timer <= 0 || Math.floor(timer / 60) <= 0) {
    tip = '刚刚'
  } else if (timer < 3600) {
    tip = Math.floor(timer / 60) + '分钟前'
  } else if (timer >= 3600 && timestamp - today >= 0) {
    tip = Math.floor(timer / 3600) + '小时前'
  } else if (timer / 86400 <= 7) {
    tip = Math.ceil(timer / 86400) + '天前'
  } else {
    tip = formatDate(timestamp, format)
  }
  return tip
}
