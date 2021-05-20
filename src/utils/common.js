/* 数组 start---------------*/
// 布尔全等判断
export const all = (arr, fn = Boolean) => arr.every(fn)
// all([4, 2, 3], x => x > 1); // true
// all([1, 2, 3]); // true
// 平均数
export const average = (...nums) => nums.reduce((acc, val) => acc + val, 0) / nums.length
// average(...[1, 2, 3]); // 2
// average(1, 2, 3); // 2
// 数组对象属性平均数
export const averageBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => acc + val, 0) /
  arr.length
// averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 5
// averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 5
export function compare(name, type) { // 数组对象排序
  return function(a, b) {
    const value1 = a[name]
    const value2 = b[name]
    if (type == 'asc') {
      return value1 - value2 // 升序,
    } else {
      return value2 - value1 // 降序,
    }
  }
}
export const shuffle = ([...arr]) => { // 随机排序数组
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr
}

// const foo = [1, 2, 3];
// shuffle(foo); // [2, 3, 1], foo = [1, 2, 3]
export const intersection = (a, b) => { // 两数组的交集
  const s = new Set(b)
  return a.filter(x => s.has(x))
}
// 递归扁平化数组 一维数组
// deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]
export const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)))
// 根据parent_id生成树结构  const nestedComments = nest(comments); // [{ id: 1, parent_id: null, children: [...] }]
export const nest = (items, id = null, link = 'parent_id') => {
//	console.log(items,id,link,items.filter(item => item[link] === id));
  return items
    .filter(item => item[link] === id)
    .map(item => ({ ...item,
      children: nest(items, item.id)
    }))
}
/* 数组 end-----------------*/

/* 对象start---------------*/
export function keyToValue(obj) { // key和value交换
  var result = {}
  for (let key in obj) {
    let value = obj[key];
    [value, key] = [key, value]
    result[key] = value
  }
  return result
}
 export function parseDom(arg) {//字符串转dom
　　 let objE = document.createElement("div");
　　 objE.innerHTML = arg;
　　 return objE.childNodes;
};
export function omit(object, props = []) { // 对象属性剔除
  const res = {}
  Object.keys(object).forEach(key => {
    if (props.includes(key) === false) {
      res[key] = typeof object[key] === 'object' && object[key] !== null
        ? JSON.parse(JSON.stringify(object[key]))
        : object[key]
    }
  })
  return res
}
// export const deepClone = data => { //对象深拷贝
//	var type = getObjType(data)
//	var obj
//	if(type === 'array') {
//		obj = []
//	} else if(type === 'object') {
//		obj = {}
//	} else {
//		// 不再具有下一层次
//		return data
//	}
//	if(type === 'array') {
//		for(var i = 0, len = data.length; i < len; i++) {
//			obj.push(deepClone(data[i]))
//		}
//	} else if(type === 'object') {
//		for(var key in data) {
//			obj[key] = deepClone(data[key])
//		}
//	}
//	return obj
// }
export function deepClone(source) { // 对象深拷贝
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
export const equals = (a, b) => { // 全等判断
  if (a === b) return true
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b
  if (a.prototype !== b.prototype) return false
  const keys = Object.keys(a)
  if (keys.length !== Object.keys(b).length) return false
  return keys.every(k => equals(a[k], b[k]))
}
// 返回日期间的天数
export const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24)
// getDaysDiffBetweenDates(new Date('2019-01-01'), new Date('2019-10-14'));
// 检查是否在某日期后
export const isAfterDate = (dateA, dateB) => dateA > dateB
// isAfterDate(new Date(2010, 10, 21), new Date(2010, 10, 20)); // true

// 检查是否在某日期前
export const isBeforeDate = (dateA, dateB) => dateA < dateB
isBeforeDate(new Date(2010, 10, 20), new Date(2010, 10, 21)) // true
/* 对象end----------------*/

/* 字符串start-----------------*/
// capitalize：首字母大写
export const capitalize = ([first, ...rest]) =>
  first.toUpperCase() + rest.join('')
// capitalize('fooBar'); // 'FooBar'
// capitalize('fooBar', true); // 'Foobar'
/* 字符串end-----------------*/
/* 数字start-----------------*/
// 生成指定范围的随机整数
export const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
// randomIntegerInRange(0, 5); // 3
// 生成指定范围的随机小数
export const randomNumberInRange = (min, max) => Math.random() * (max - min) + min
// randomNumberInRange(2, 10); // 6.0211363285087005
// 四舍五入到指定位数
export const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)
// round(1.005, 2); // 1.01
// 计算数组或多个数字的总和
export const sum = (...arr) => [...arr].reduce((acc, val) => acc + val, 0)
// sum(1, 2, 3, 4); // 10
// sum(...[1, 2, 3, 4]); // 10
/* 数字end-----------------*/

// runPromisesInSeries：依次运行多个Promises
export const runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve())
// const delay = d => new Promise(r => setTimeout(r, d));
// runPromisesInSeries([() => delay(1000), () => delay(2000)]);
// 依次执行每个Promises ，总共需要3秒钟才能完成
export const scrollToTop = () => { // 平滑滚动至顶部
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}
// scrollToTop();
export const smoothScroll = element => // 滚动到指定元素区域
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  })

// smoothScroll('#fooBar');
// smoothScroll('.fooBar');
export function remTpx(width, rem, min, max) { // 使用rem，width设计稿宽度、min不超过多少px
  const docEl = document.documentElement
  const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  if (!clientWidth) return
  const fontSize = 100 * (clientWidth / width)
  if (min) {
    return (rem * fontSize) > min ? rem * fontSize : min
  } else {
    return rem * fontSize
  }
}
export function numberToChinese(number) { // 数字转中文
  const units = '个十百千万@#%亿^&~'
  const chars = '零一二三四五六七八九'
  const a = (number + '').split('')
  const s = []
  const t = this
  if (a.length > 12) {
    throw new Error('too big')
  } else {
    for (let i = 0, j = a.length - 1; i <= j; i++) {
      if (j == 1 || j == 5 || j == 9) { // 两位数 处理特殊的 1*
        if (i == 0) {
          if (a[i] != '1') s.push(chars.charAt(a[i]))
        } else {
          s.push(chars.charAt(a[i]))
        }
      } else {
        s.push(chars.charAt(a[i]))
      }
      if (i != j) {
        s.push(units.charAt(j - i))
      }
    }
  }
  // return s;
  return s.join('').replace(/零([十百千万亿@#%^&~])/g, function(m, d, b) { // 优先处理 零百 零千 等
    b = units.indexOf(d)
    if (b != -1) {
      if (d == '亿') return d
      if (d == '万') return d
      if (a[j - b] == '0') return '零'
    }
    return ''
  }).replace(/零+/g, '零').replace(/零([万亿])/g, function(m, b) { // 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
    return b
  }).replace(/亿[万千百]/g, '亿').replace(/[零]$/, '').replace(/[@#%^&~]/g, function(m) {
    return {
      '@': '十',
      '#': '百',
      '%': '千',
      '^': '十',
      '&': '百',
      '~': '千'
    }[m]
  }).replace(/([亿万])([一-九])/g, function(m, d, b, c) {
    c = units.indexOf(d)
    if (c != -1) {
      if (a[j - c] == '0') return d + '零' + b
    }
    return m
  })
}
export function thousands(num) { // 千分位
  return (num + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
}
export function getCN(v) { // 保留中文
  if (typeof (v) === 'string') {
    const regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g
    return v.replace(regEx, '')
  }
}
export function formatDate(format = 'Y-M-D h:m', timestamp = Date.now()) { // 日期格式化
  const date = new Date(timestamp)
  const dateInfo = {
    Y: date.getFullYear(),
    M: date.getMonth() + 1,
    D: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  }
  const formatNumber = (n) => n > 10 ? n : '0' + n
  const res = format
    .replace('Y', dateInfo.Y)
    .replace('M', dateInfo.M)
    .replace('D', dateInfo.D)
    .replace('h', formatNumber(dateInfo.h))
    .replace('m', formatNumber(dateInfo.m))
    .replace('s', formatNumber(dateInfo.s))
  return res
}
export function replaceSpace(name, val) { // 替换空格
  return name.replace(/\s+/g, val || '')
}
export function getCookie(name) { // 获取cookie值
  var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
  if (arr != null) return unescape(arr[2])
  return null
}
export function isType(target, type) { // 类型判断
  const targetType = Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
  return targetType === type.toLowerCase()
}
export function debounce(func, wait = 300, immediate = false) { // 防抖  用于减少函数请求次数  只执行这些请求的最后一次
  let timer, ctx
  const later = (arg) => setTimeout(() => {
    func.apply(ctx, arg)
    timer = ctx = null
  }, wait)
  return function(...arg) {
    if (!timer) {
      timer = later(arg)
      ctx = this
      if (immediate) {
        func.apply(ctx, arg)
      }
    } else {
      clearTimeout(timer)
      timer = later(arg)
    }
  }
}
export function throttle(func, delay) { // 节流   用于减少函数请求次数  在一段时间执行一次
  let timer = null
  return function(...arg) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, arg)
        timer = null
      }, delay)
    }
  }
}
export function isPCBroswer() { // 是否为pc浏览器
  const e = window.navigator.userAgent.toLowerCase()
  const t = e.match(/ipad/i) == 'ipad'
  const i = e.match(/iphone/i) == 'iphone'
  const r = e.match(/midp/i) == 'midp'
  const n = e.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4'
  const a = e.match(/ucweb/i) == 'ucweb'
  const o = e.match(/android/i) == 'android'
  const s = e.match(/windows ce/i) == 'windows ce'
  const l = e.match(/windows mobile/i) == 'windows mobile'
  return !(t || i || r || n || a || o || s || l)
}
export function getPlatformInfo() { // 识别浏览器及平台
  // 运行环境是浏览器
  const inBrowser = typeof window !== 'undefined'
  // 运行环境是微信
  const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
  const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
  // 浏览器 UA 判断
  const UA = inBrowser && window.navigator.userAgent.toLowerCase()
  if (UA) {
    const platforms = {
      IE: /msie|trident/.test(UA),
      IE9: UA.indexOf('msie 9.0') > 0,
      Edge: UA.indexOf('edge/') > 0,
      Android: UA.indexOf('android') > 0 || (weexPlatform === 'android'),
      IOS: /iphone|ipad|ipod|ios/.test(UA) || (weexPlatform === 'ios'),
      Chrome: /chrome\/\d+/.test(UA) && !(UA.indexOf('edge/') > 0)
    }
    for (const key in platforms) {
      if (platforms.hasOwnProperty(key)) {
        if (platforms[key]) return key
      }
    }
  }
}
const countryArr = [ // 国家数组
  {
    'short': 'AD',
    'name': '安道尔共和国',
    'en': 'Andorra',
    'tel': '376',
    'pinyin': 'adeghg'
  },
  {
    'short': 'AE',
    'name': '阿拉伯联合酋长国',
    'en': 'UnitedArabEmirates',
    'tel': '971',
    'pinyin': 'alblhqzg'
  },
  {
    'short': 'AF',
    'name': '阿富汗',
    'en': 'Afghanistan',
    'tel': '93',
    'pinyin': 'afh'
  },
  {
    'short': 'AG',
    'name': '安提瓜和巴布达',
    'en': 'AntiguaandBarbuda',
    'tel': '1268',
    'pinyin': 'atghbbd'
  },
  {
    'short': 'AI',
    'name': '安圭拉岛',
    'en': 'Anguilla',
    'tel': '1264',
    'pinyin': 'agld'
  },
  {
    'short': 'AL',
    'name': '阿尔巴尼亚',
    'en': 'Albania',
    'tel': '355',
    'pinyin': 'aebny'
  },
  {
    'short': 'AM',
    'name': '阿美尼亚',
    'en': 'Armenia',
    'tel': '374',
    'pinyin': 'amny'
  },
  {
    'short': '',
    'name': '阿森松',
    'en': 'Ascension',
    'tel': '247',
    'pinyin': 'als'

  },
  {
    'short': 'AO',
    'name': '安哥拉',
    'en': 'Angola',
    'tel': '244',
    'pinyin': 'agl'

  },
  {
    'short': 'AR',
    'name': '阿根廷',
    'en': 'Argentina',
    'tel': '54',
    'pinyin': 'agt'

  },
  {
    'short': 'AT',
    'name': '奥地利',
    'en': 'Austria',
    'tel': '43',
    'pinyin': 'adl'

  },
  {
    'short': 'AU',
    'name': '澳大利亚',
    'en': 'Australia',
    'tel': '61',
    'pinyin': 'adly'

  },
  {
    'short': 'AZ',
    'name': '阿塞拜疆',
    'en': 'Azerbaijan',
    'tel': '994',
    'pinyin': 'asbj'

  },
  {
    'short': 'BB',
    'name': '巴巴多斯',
    'en': 'Barbados',
    'tel': '1246',
    'pinyin': 'bbds'

  },
  {
    'short': 'BD',
    'name': '孟加拉国',
    'en': 'Bangladesh',
    'tel': '880',
    'pinyin': 'mjlg'

  },
  {
    'short': 'BE',
    'name': '比利时',
    'en': 'Belgium',
    'tel': '32',
    'pinyin': 'bls'

  },
  {
    'short': 'BF',
    'name': '布基纳法索',
    'en': 'Burkina-faso',
    'tel': '226',
    'pinyin': 'bjnfs'

  },
  {
    'short': 'BG',
    'name': '保加利亚',
    'en': 'Bulgaria',
    'tel': '359',
    'pinyin': 'bjly'

  },
  {
    'short': 'BH',
    'name': '巴林',
    'en': 'Bahrain',
    'tel': '973',
    'pinyin': 'bl'

  },
  {
    'short': 'BI',
    'name': '布隆迪',
    'en': 'Burundi',
    'tel': '257',
    'pinyin': 'bld'

  },
  {
    'short': 'BJ',
    'name': '贝宁',
    'en': 'Benin',
    'tel': '229',
    'pinyin': 'bl'

  },
  {
    'short': 'BL',
    'name': '巴勒斯坦',
    'en': 'Palestine',
    'tel': '970',
    'pinyin': 'blst'

  },
  {
    'short': 'BM',
    'name': '百慕大群岛',
    'en': 'BermudaIs.',
    'tel': '1441',
    'pinyin': 'bmdqd'

  },
  {
    'short': 'BN',
    'name': '文莱',
    'en': 'Brunei',
    'tel': '673',
    'pinyin': 'wl'

  },
  {
    'short': 'BO',
    'name': '玻利维亚',
    'en': 'Bolivia',
    'tel': '591',
    'pinyin': 'blwy'

  },
  {
    'short': 'BR',
    'name': '巴西',
    'en': 'Brazil',
    'tel': '55',
    'pinyin': 'bx'

  },
  {
    'short': 'BS',
    'name': '巴哈马',
    'en': 'Bahamas',
    'tel': '1242',
    'pinyin': 'bhm'

  },
  {
    'short': 'BW',
    'name': '博茨瓦纳',
    'en': 'Botswana',
    'tel': '267',
    'pinyin': 'bcwn'

  },
  {
    'short': 'BY',
    'name': '白俄罗斯',
    'en': 'Belarus',
    'tel': '375',
    'pinyin': 'bels'

  },
  {
    'short': 'BZ',
    'name': '伯利兹',
    'en': 'Belize',
    'tel': '501',
    'pinyin': 'blz'

  },
  {
    'short': 'CA',
    'name': '加拿大',
    'en': 'Canada',
    'tel': '1',
    'pinyin': 'jnd'

  },
  {
    'short': '',
    'name': '开曼群岛',
    'en': 'CaymanIs.',
    'tel': '1345',
    'pinyin': 'kmqd'

  },
  {
    'short': 'CF',
    'name': '中非共和国',
    'en': 'CentralAfricanRepublic',
    'tel': '236',
    'pinyin': 'zfghg'

  },
  {
    'short': 'CG',
    'name': '刚果',
    'en': 'Congo',
    'tel': '242',
    'pinyin': 'gg'

  },
  {
    'short': 'CH',
    'name': '瑞士',
    'en': 'Switzerland',
    'tel': '41',
    'pinyin': 'rs'

  },
  {
    'short': 'CK',
    'name': '库克群岛',
    'en': 'CookIs.',
    'tel': '682',
    'pinyin': 'kkqd'

  },
  {
    'short': 'CL',
    'name': '智利',
    'en': 'Chile',
    'tel': '56',
    'pinyin': 'zl'

  },
  {
    'short': 'CM',
    'name': '喀麦隆',
    'en': 'Cameroon',
    'tel': '237',
    'pinyin': 'kml'

  },
  {
    'short': 'CN',
    'name': '中国',
    'en': 'China',
    'tel': '86',
    'pinyin': 'zg'

  },
  {
    'short': 'CO',
    'name': '哥伦比亚',
    'en': 'Colombia',
    'tel': '57',
    'pinyin': 'glby'

  },
  {
    'short': 'CR',
    'name': '哥斯达黎加',
    'en': 'CostaRica',
    'tel': '506',
    'pinyin': 'gsdlj'

  },
  {
    'short': 'CS',
    'name': '捷克',
    'en': 'Czech',
    'tel': '420',
    'pinyin': 'jk'

  },
  {
    'short': 'CU',
    'name': '古巴',
    'en': 'Cuba',
    'tel': '53',
    'pinyin': 'gb'

  },
  {
    'short': 'CY',
    'name': '塞浦路斯',
    'en': 'Cyprus',
    'tel': '357',
    'pinyin': 'spls'

  },
  {
    'short': 'CZ',
    'name': '捷克',
    'en': 'CzechRepublic',
    'tel': '420',
    'pinyin': 'jk'

  },
  {
    'short': 'DE',
    'name': '德国',
    'en': 'Germany',
    'tel': '49',
    'pinyin': 'dg'

  },
  {
    'short': 'DJ',
    'name': '吉布提',
    'en': 'Djibouti',
    'tel': '253',
    'pinyin': 'jbt'

  },
  {
    'short': 'DK',
    'name': '丹麦',
    'en': 'Denmark',
    'tel': '45',
    'pinyin': 'dm'

  },
  {
    'short': 'DO',
    'name': '多米尼加共和国',
    'en': 'DominicaRep.',
    'tel': '1890',
    'pinyin': 'dmnjghg'

  },
  {
    'short': 'DZ',
    'name': '阿尔及利亚',
    'en': 'Algeria',
    'tel': '213',
    'pinyin': 'aejly'

  },
  {
    'short': 'EC',
    'name': '厄瓜多尔',
    'en': 'Ecuador',
    'tel': '593',
    'pinyin': 'egde'

  },
  {
    'short': 'EE',
    'name': '爱沙尼亚',
    'en': 'Estonia',
    'tel': '372',
    'pinyin': 'asny'

  },
  {
    'short': 'EG',
    'name': '埃及',
    'en': 'Egypt',
    'tel': '20',
    'pinyin': 'ej'

  },
  {
    'short': 'ES',
    'name': '西班牙',
    'en': 'Spain',
    'tel': '34',
    'pinyin': 'xby'

  },
  {
    'short': 'ET',
    'name': '埃塞俄比亚',
    'en': 'Ethiopia',
    'tel': '251',
    'pinyin': 'aseby'

  },
  {
    'short': 'FI',
    'name': '芬兰',
    'en': 'Finland',
    'tel': '358',
    'pinyin': 'fl'

  },
  {
    'short': 'FJ',
    'name': '斐济',
    'en': 'Fiji',
    'tel': '679',
    'pinyin': 'fj'

  },
  {
    'short': 'FR',
    'name': '法国',
    'en': 'France',
    'tel': '33',
    'pinyin': 'fg'

  },
  {
    'short': 'GA',
    'name': '加蓬',
    'en': 'Gabon',
    'tel': '241',
    'pinyin': 'jp'

  },
  {
    'short': 'GB',
    'name': '英国',
    'en': 'UnitedKiongdom',
    'tel': '44',
    'pinyin': 'yg'

  },
  {
    'short': 'GD',
    'name': '格林纳达',
    'en': 'Grenada',
    'tel': '1809',
    'pinyin': 'glnd'

  },
  {
    'short': 'GE',
    'name': '格鲁吉亚',
    'en': 'Georgia',
    'tel': '995',
    'pinyin': 'gljy'

  },
  {
    'short': 'GF',
    'name': '法属圭亚那',
    'en': 'FrenchGuiana',
    'tel': '594',
    'pinyin': 'fsgyn'

  },
  {
    'short': 'GH',
    'name': '加纳',
    'en': 'Ghana',
    'tel': '233',
    'pinyin': 'jn'

  },
  {
    'short': 'GI',
    'name': '直布罗陀',
    'en': 'Gibraltar',
    'tel': '350',
    'pinyin': 'zblt'

  },
  {
    'short': 'GM',
    'name': '冈比亚',
    'en': 'Gambia',
    'tel': '220',
    'pinyin': 'gby'

  },
  {
    'short': 'GN',
    'name': '几内亚',
    'en': 'Guinea',
    'tel': '224',
    'pinyin': 'jny'

  },
  {
    'short': 'GR',
    'name': '希腊',
    'en': 'Greece',
    'tel': '30',
    'pinyin': 'xl'

  },
  {
    'short': 'GT',
    'name': '危地马拉',
    'en': 'Guatemala',
    'tel': '502',
    'pinyin': 'wdml'

  },
  {
    'short': 'GU',
    'name': '关岛',
    'en': 'Guam',
    'tel': '1671',
    'pinyin': 'gd'

  },
  {
    'short': 'GY',
    'name': '圭亚那',
    'en': 'Guyana',
    'tel': '592',
    'pinyin': 'gyn'

  },
  {
    'short': 'HK',
    'name': '香港(中国)',
    'en': 'Hongkong',
    'tel': '852',
    'pinyin': 'xgzg'

  },
  {
    'short': 'HN',
    'name': '洪都拉斯',
    'en': 'Honduras',
    'tel': '504',
    'pinyin': 'hdls'

  },
  {
    'short': 'HT',
    'name': '海地',
    'en': 'Haiti',
    'tel': '509',
    'pinyin': 'hd'

  },
  {
    'short': 'HU',
    'name': '匈牙利',
    'en': 'Hungary',
    'tel': '36',
    'pinyin': 'xyl'

  },
  {
    'short': 'ID',
    'name': '印度尼西亚',
    'en': 'Indonesia',
    'tel': '62',
    'pinyin': 'ydnxy'

  },
  {
    'short': 'IE',
    'name': '爱尔兰',
    'en': 'Ireland',
    'tel': '353',
    'pinyin': 'ael'

  },
  {
    'short': 'IL',
    'name': '以色列',
    'en': 'Israel',
    'tel': '972',
    'pinyin': 'ysl'

  },
  {
    'short': 'IN',
    'name': '印度',
    'en': 'India',
    'tel': '91',
    'pinyin': 'yd'

  },
  {
    'short': 'IQ',
    'name': '伊拉克',
    'en': 'Iraq',
    'tel': '964',
    'pinyin': 'ylk'

  },
  {
    'short': 'IR',
    'name': '伊朗',
    'en': 'Iran',
    'tel': '98',
    'pinyin': 'yl'

  },
  {
    'short': 'IS',
    'name': '冰岛',
    'en': 'Iceland',
    'tel': '354',
    'pinyin': 'bd'

  },
  {
    'short': 'IT',
    'name': '意大利',
    'en': 'Italy',
    'tel': '39',
    'pinyin': 'ydl'

  },
  {
    'short': '',
    'name': '科特迪瓦',
    'en': 'IvoryCoast',
    'tel': '225',
    'pinyin': 'ktdw'

  },
  {
    'short': 'JM',
    'name': '牙买加',
    'en': 'Jamaica',
    'tel': '1876',
    'pinyin': 'ymj'

  },
  {
    'short': 'JO',
    'name': '约旦',
    'en': 'Jordan',
    'tel': '962',
    'pinyin': 'yd'

  },
  {
    'short': 'JP',
    'name': '日本',
    'en': 'Japan',
    'tel': '81',
    'pinyin': 'rb'

  },
  {
    'short': 'KE',
    'name': '肯尼亚',
    'en': 'Kenya',
    'tel': '254',
    'pinyin': 'kny'

  },
  {
    'short': 'KG',
    'name': '吉尔吉斯坦',
    'en': 'Kyrgyzstan',
    'tel': '331',
    'pinyin': 'jejst'

  },
  {
    'short': 'KH',
    'name': '柬埔寨',
    'en': 'Kampuchea(Cambodia)',
    'tel': '855',
    'pinyin': 'jpz'

  },
  {
    'short': 'KP',
    'name': '朝鲜',
    'en': 'NorthKorea',
    'tel': '850',
    'pinyin': 'cx'

  },
  {
    'short': 'KR',
    'name': '韩国',
    'en': 'Korea',
    'tel': '82',
    'pinyin': 'hg'

  },
  {
    'short': 'KT',
    'name': '科特迪瓦共和国',
    'en': 'RepublicofIvoryCoast',
    'tel': '225',
    'pinyin': 'ktdwghg'

  },
  {
    'short': 'KW',
    'name': '科威特',
    'en': 'Kuwait',
    'tel': '965',
    'pinyin': 'kwt'

  },
  {
    'short': 'KZ',
    'name': '哈萨克斯坦',
    'en': 'Kazakstan',
    'tel': '327',
    'pinyin': 'hskst'

  },
  {
    'short': 'LA',
    'name': '老挝',
    'en': 'Laos',
    'tel': '856',
    'pinyin': 'lw'

  },
  {
    'short': 'LB',
    'name': '黎巴嫩',
    'en': 'Lebanon',
    'tel': '961',
    'pinyin': 'lbn'

  },
  {
    'short': 'LC',
    'name': '圣卢西亚',
    'en': 'St.Lucia',
    'tel': '1758',
    'pinyin': 'slxy'

  },
  {
    'short': 'LI',
    'name': '列支敦士登',
    'en': 'Liechtenstein',
    'tel': '423',
    'pinyin': 'lzdsd'

  },
  {
    'short': 'LK',
    'name': '斯里兰卡',
    'en': 'SriLanka',
    'tel': '94',
    'pinyin': 'sllk'

  },
  {
    'short': 'LR',
    'name': '利比里亚',
    'en': 'Liberia',
    'tel': '231',
    'pinyin': 'lbly'

  },
  {
    'short': 'LS',
    'name': '莱索托',
    'en': 'Lesotho',
    'tel': '266',
    'pinyin': 'lst'

  },
  {
    'short': 'LT',
    'name': '立陶宛',
    'en': 'Lithuania',
    'tel': '370',
    'pinyin': 'ltw'

  },
  {
    'short': 'LU',
    'name': '卢森堡',
    'en': 'Luxembourg',
    'tel': '352',
    'pinyin': 'lsb'

  },
  {
    'short': 'LV',
    'name': '拉脱维亚',
    'en': 'Latvia',
    'tel': '371',
    'pinyin': 'ltwy'

  },
  {
    'short': 'LY',
    'name': '利比亚',
    'en': 'Libya',
    'tel': '218',
    'pinyin': 'lby'

  },
  {
    'short': 'MA',
    'name': '摩洛哥',
    'en': 'Morocco',
    'tel': '212',
    'pinyin': 'mlg'

  },
  {
    'short': 'MC',
    'name': '摩纳哥',
    'en': 'Monaco',
    'tel': '377',
    'pinyin': 'mng'

  },
  {
    'short': 'MD',
    'name': '摩尔多瓦',
    'en': 'Moldova,Republicof',
    'tel': '373',
    'pinyin': 'medw'

  },
  {
    'short': 'MG',
    'name': '马达加斯加',
    'en': 'Madagascar',
    'tel': '261',
    'pinyin': 'mdjsj'

  },
  {
    'short': 'ML',
    'name': '马里',
    'en': 'Mali',
    'tel': '223',
    'pinyin': 'ml'

  },
  {
    'short': 'MM',
    'name': '缅甸',
    'en': 'Burma',
    'tel': '95',
    'pinyin': 'md'

  },
  {
    'short': 'MN',
    'name': '蒙古',
    'en': 'Mongolia',
    'tel': '976',
    'pinyin': 'mg'

  },
  {
    'short': 'MO',
    'name': '澳门（中国）',
    'en': 'Macao',
    'tel': '853',
    'pinyin': 'am zg'

  },
  {
    'short': 'MS',
    'name': '蒙特塞拉特岛',
    'en': 'MontserratIs',
    'tel': '1664',
    'pinyin': 'mtsstd'

  },
  {
    'short': 'MT',
    'name': '马耳他',
    'en': 'Malta',
    'tel': '356',
    'pinyin': 'met'

  },
  {
    'short': '',
    'name': '马里亚那群岛',
    'en': 'MarianaIs',
    'tel': '1670',
    'pinyin': 'mlynqd'

  },
  {
    'short': '',
    'name': '马提尼克',
    'en': 'Martinique',
    'tel': '596',
    'pinyin': 'mtnk'

  },
  {
    'short': 'MU',
    'name': '毛里求斯',
    'en': 'Mauritius',
    'tel': '230',
    'pinyin': 'mlqs'

  },
  {
    'short': 'MV',
    'name': '马尔代夫',
    'en': 'Maldives',
    'tel': '960',
    'pinyin': 'medf'

  },
  {
    'short': 'MW',
    'name': '马拉维',
    'en': 'Malawi',
    'tel': '265',
    'pinyin': 'mlw'

  },
  {
    'short': 'MX',
    'name': '墨西哥',
    'en': 'Mexico',
    'tel': '52',
    'pinyin': 'mxg'

  },
  {
    'short': 'MY',
    'name': '马来西亚',
    'en': 'Malaysia',
    'tel': '60',
    'pinyin': 'mlxy'

  },
  {
    'short': 'MZ',
    'name': '莫桑比克',
    'en': 'Mozambique',
    'tel': '258',
    'pinyin': 'msbk'

  },
  {
    'short': 'NA',
    'name': '纳米比亚',
    'en': 'Namibia',
    'tel': '264',
    'pinyin': 'nmby'

  },
  {
    'short': 'NE',
    'name': '尼日尔',
    'en': 'Niger',
    'tel': '977',
    'pinyin': 'nre'

  },
  {
    'short': 'NG',
    'name': '尼日利亚',
    'en': 'Nigeria',
    'tel': '234',
    'pinyin': 'nrly'

  },
  {
    'short': 'NI',
    'name': '尼加拉瓜',
    'en': 'Nicaragua',
    'tel': '505',
    'pinyin': 'njlg'

  },
  {
    'short': 'NL',
    'name': '荷兰',
    'en': 'Netherlands',
    'tel': '31',
    'pinyin': 'hl'

  },
  {
    'short': 'NO',
    'name': '挪威',
    'en': 'Norway',
    'tel': '47',
    'pinyin': 'nw'

  },
  {
    'short': 'NP',
    'name': '尼泊尔',
    'en': 'Nepal',
    'tel': '977',
    'pinyin': 'nbe'

  },
  {
    'short': '',
    'name': '荷属安的列斯',
    'en': 'NetheriandsAntilles',
    'tel': '599',
    'pinyin': 'hsadls'

  },
  {
    'short': 'NR',
    'name': '瑙鲁',
    'en': 'Nauru',
    'tel': '674',
    'pinyin': 'nl'

  },
  {
    'short': 'NZ',
    'name': '新西兰',
    'en': 'NewZealand',
    'tel': '64',
    'pinyin': 'xxl'

  },
  {
    'short': 'OM',
    'name': '阿曼',
    'en': 'Oman',
    'tel': '968',
    'pinyin': 'am'

  },
  {
    'short': 'PA',
    'name': '巴拿马',
    'en': 'Panama',
    'tel': '507',
    'pinyin': 'bnm'

  },
  {
    'short': 'PE',
    'name': '秘鲁',
    'en': 'Peru',
    'tel': '51',
    'pinyin': 'bl'

  },
  {
    'short': 'PF',
    'name': '法属玻利尼西亚',
    'en': 'FrenchPolynesia',
    'tel': '689',
    'pinyin': 'fsblnxy'

  },
  {
    'short': 'PG',
    'name': '巴布亚新几内亚',
    'en': 'PapuaNewCuinea',
    'tel': '675',
    'pinyin': 'bbyxjny'

  },
  {
    'short': 'PH',
    'name': '菲律宾',
    'en': 'Philippines',
    'tel': '63',
    'pinyin': 'flb'

  },
  {
    'short': 'PK',
    'name': '巴基斯坦',
    'en': 'Pakistan',
    'tel': '92',
    'pinyin': 'bjst'

  },
  {
    'short': 'PL',
    'name': '波兰',
    'en': 'Poland',
    'tel': '48',
    'pinyin': 'bl'

  },
  {
    'short': 'PR',
    'name': '波多黎各',
    'en': 'PuertoRico',
    'tel': '1787',
    'pinyin': 'bdlg'

  },
  {
    'short': 'PT',
    'name': '葡萄牙',
    'en': 'Portugal',
    'tel': '351',
    'pinyin': 'pty'

  },
  {
    'short': 'PY',
    'name': '巴拉圭',
    'en': 'Paraguay',
    'tel': '595',
    'pinyin': 'blg'

  },
  {
    'short': 'QA',
    'name': '卡塔尔',
    'en': 'Qatar',
    'tel': '974',
    'pinyin': 'kte'

  },
  {
    'short': '',
    'name': '留尼旺',
    'en': 'Reunion',
    'tel': '262',
    'pinyin': 'lnw'

  },
  {
    'short': 'RO',
    'name': '罗马尼亚',
    'en': 'Romania',
    'tel': '40',
    'pinyin': 'lmny'

  },
  {
    'short': 'RU',
    'name': '俄罗斯',
    'en': 'Russia',
    'tel': '7',
    'pinyin': 'els'

  },
  {
    'short': 'SA',
    'name': '沙特阿拉伯',
    'en': 'SaudiArabia',
    'tel': '966',
    'pinyin': 'stalb'

  },
  {
    'short': 'SB',
    'name': '所罗门群岛',
    'en': 'SolomonIs',
    'tel': '677',
    'pinyin': 'slmqd'

  },
  {
    'short': 'SC',
    'name': '塞舌尔',
    'en': 'Seychelles',
    'tel': '248',
    'pinyin': 'sse'

  },
  {
    'short': 'SD',
    'name': '苏丹',
    'en': 'Sudan',
    'tel': '249',
    'pinyin': 'sd'

  },
  {
    'short': 'SE',
    'name': '瑞典',
    'en': 'Sweden',
    'tel': '46',
    'pinyin': 'rd'

  },
  {
    'short': 'SG',
    'name': '新加坡',
    'en': 'Singapore',
    'tel': '65',
    'pinyin': 'xjp'

  },
  {
    'short': 'SI',
    'name': '斯洛文尼亚',
    'en': 'Slovenia',
    'tel': '386',
    'pinyin': 'slwny'

  },
  {
    'short': 'SK',
    'name': '斯洛伐克',
    'en': 'Slovakia',
    'tel': '421',
    'pinyin': 'slfk'

  },
  {
    'short': 'SL',
    'name': '塞拉利昂',
    'en': 'SierraLeone',
    'tel': '232',
    'pinyin': 'slla'

  },
  {
    'short': 'SM',
    'name': '圣马力诺',
    'en': 'SanMarino',
    'tel': '378',
    'pinyin': 'smln'

  },
  {
    'short': '',
    'name': '东萨摩亚(美)',
    'en': 'SamoaEastern',
    'tel': '684',
    'pinyin': 'dsmym'

  },
  {
    'short': '',
    'name': '西萨摩亚',
    'en': 'SanMarino',
    'tel': '685',
    'pinyin': 'xsmy'

  },
  {
    'short': 'SN',
    'name': '塞内加尔',
    'en': 'Senegal',
    'tel': '221',
    'pinyin': 'snje'

  },
  {
    'short': 'SO',
    'name': '索马里',
    'en': 'Somali',
    'tel': '252',
    'pinyin': 'sml'

  },
  {
    'short': 'SR',
    'name': '苏里南',
    'en': 'Suriname',
    'tel': '597',
    'pinyin': 'sln'

  },
  {
    'short': 'ST',
    'name': '圣多美和普林西比',
    'en': 'SaoTomeandPrincipe',
    'tel': '239',
    'pinyin': 'sdmhplxb'

  },
  {
    'short': 'SV',
    'name': '萨尔瓦多',
    'en': 'EISalvador',
    'tel': '503',
    'pinyin': 'sewd'

  },
  {
    'short': 'SY',
    'name': '叙利亚',
    'en': 'Syria',
    'tel': '963',
    'pinyin': 'xly'

  },
  {
    'short': 'SZ',
    'name': '斯威士兰',
    'en': 'Swaziland',
    'tel': '268',
    'pinyin': 'swsl'

  },
  {
    'short': 'TD',
    'name': '乍得',
    'en': 'Chad',
    'tel': '235',
    'pinyin': 'zd'

  },
  {
    'short': 'TG',
    'name': '多哥',
    'en': 'Togo',
    'tel': '228',
    'pinyin': 'dg'

  },
  {
    'short': 'TH',
    'name': '泰国',
    'en': 'Thailand',
    'tel': '66',
    'pinyin': 'tg'

  },
  {
    'short': 'TJ',
    'name': '塔吉克斯坦',
    'en': 'Tajikstan',
    'tel': '992',
    'pinyin': 'tjkst'

  },
  {
    'short': 'TM',
    'name': '土库曼斯坦',
    'en': 'Turkmenistan',
    'tel': '993',
    'pinyin': 'tkmst'

  },
  {
    'short': 'TN',
    'name': '突尼斯',
    'en': 'Tunisia',
    'tel': '216',
    'pinyin': 'tns'

  },
  {
    'short': 'TO',
    'name': '汤加',
    'en': 'Tonga',
    'tel': '676',
    'pinyin': 'tj'

  },
  {
    'short': 'TR',
    'name': '土耳其',
    'en': 'Turkey',
    'tel': '90',
    'pinyin': 'teq'

  },
  {
    'short': 'TT',
    'name': '特立尼达和多巴哥',
    'en': 'TrinidadandTobago',
    'tel': '1809',
    'pinyin': 'tlndhdbg'

  },
  {
    'short': 'TW',
    'name': '台湾（中国）',
    'en': 'Taiwan',
    'tel': '886',
    'pinyin': 'twzg'

  },
  {
    'short': 'TZ',
    'name': '坦桑尼亚',
    'en': 'Tanzania',
    'tel': '255',
    'pinyin': 'tsny'

  },
  {
    'short': 'UA',
    'name': '乌克兰',
    'en': 'Ukraine',
    'tel': '380',
    'pinyin': 'wkl'

  },
  {
    'short': 'UG',
    'name': '乌干达',
    'en': 'Uganda',
    'tel': '256',
    'pinyin': 'wgd'

  },
  {
    'short': 'US',
    'name': '美国',
    'en': 'UnitedStatesofAmerica',
    'tel': '1',
    'pinyin': 'mg'

  },
  {
    'short': 'UY',
    'name': '乌拉圭',
    'en': 'Uruguay',
    'tel': '598',
    'pinyin': 'wlg'

  },
  {
    'short': 'UZ',
    'name': '乌兹别克斯坦',
    'en': 'Uzbekistan',
    'tel': '233',
    'pinyin': 'wzbkst'

  },
  {
    'short': 'VC',
    'name': '圣文森特岛',
    'en': 'SaintVincent',
    'tel': '1784',
    'pinyin': 'swstd'

  },
  {
    'short': 'VE',
    'name': '委内瑞拉',
    'en': 'Venezuela',
    'tel': '58',
    'pinyin': 'wnrl'

  },
  {
    'short': 'VN',
    'name': '越南',
    'en': 'Vietnam',
    'tel': '84',
    'pinyin': 'yn'

  },
  {
    'short': 'YE',
    'name': '也门',
    'en': 'Yemen',
    'tel': '967',
    'pinyin': 'ym'

  },
  {
    'short': 'YU',
    'name': '南斯拉夫',
    'en': 'Yugoslavia',
    'tel': '381',
    'pinyin': 'nslf'

  },
  {
    'short': 'ZA',
    'name': '南非',
    'en': 'SouthAfrica',
    'tel': '27',
    'pinyin': 'nf'

  },
  {
    'short': 'ZM',
    'name': '赞比亚',
    'en': 'Zambia',
    'tel': '260',
    'pinyin': 'zby'

  },
  {
    'short': 'ZR',
    'name': '扎伊尔',
    'en': 'Zaire',
    'tel': '243',
    'pinyin': 'zye'

  },
  {
    'short': 'ZW',
    'name': '津巴布韦',
    'en': 'Zimbabwe',
    'tel': '263',
    'pinyin': 'jbbw'

  }
]
export {
  countryArr
}
