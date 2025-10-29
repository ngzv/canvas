/**
 * 验证手机号是否符合格式
 * @param {String} value 
 * @returns {Boolean}
 */
export function validatePhone(value) {
  if (!value) {
    return false;
  } else {
    const regex = /(^1[3-9]\d{9}$)/;
    if (regex.test(value)) {
      return true;
    } else {
      return false;
    }
  }
}

/**
 * 验证身份证号是否符合格式
 * @param {String} value 
 * @returns {Boolean}
 */
export function validateIDCard(value) {
  if (!value) {
    return false;
  } else {
    const regex = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
    if (regex.test(value)) {
      return true;
    } else {
      return false;
    }
  }
}

/**
 * 判断 value 字符串是否为空 
 * @param {String} value
 * @returns {Boolean}
 */
export function isEmpty(value) {
  if (value === null || value === '' || value === undefined || value === 'undefined') {
    return true;
  }
  return false;
}