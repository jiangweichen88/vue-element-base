/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
function deepClone(source) {
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
const deepClone0 = data => { //对象深拷贝
	var type = getObjType(data)
	var obj
	if(type === 'array') {
		obj = []
	} else if(type === 'object') {
		obj = {}
	} else {
		// 不再具有下一层次
		return data
	}
	if(type === 'array') {
		for(var i = 0, len = data.length; i < len; i++) {
			obj.push(deepClone(data[i]))
		}
	} else if(type === 'object') {
		for(var key in data) {
			obj[key] = deepClone(data[key])
		}
	}
	return obj
}
module.exports = {
  param2Obj,
  deepClone,
  deepClone0
}
