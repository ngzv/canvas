import CryptoJS from 'crypto-js';

const SECRET_KEY = 'XTL2567';  // 加密密钥（建议从环境变量获取）

/**
 * 加密数据
 * @param {*} data 要加密的数据
 * @returns 加密后的字符串
 * 
 * localStorage.setItem('ACCESS_TOKEN', encrypt(token));
 */
export function encrypt(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

/**
 * 解密数据
 * @param {String} ciphertext 要解密的字符串
 * @returns 解密后的对象
 * 
 * const saved = localStorage.getItem('ACCESS_TOKEN');
 * if (saved) console.info(decrypt(saved));
 */
export function decrypt(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};


// JS 自带 btoa 方法，不需要引入依赖
/**
 * Base64 编码
 * @param {String} str 要编码的字符串
 * @returns 编码后的字符串
 * 
 * const encodedString = base64Encode('哈哈哈');
 * console.log(encodedString); 
 */
export function base64Encode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Base64 解码
 * @param {String} str 要解码的字符串
 * @returns 解码后的字符串
 * 
 * const decodedString = base64Decode(encodedString);
 * console.log(decodedString); 
 */
export function base64Decode(str) {
  return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}