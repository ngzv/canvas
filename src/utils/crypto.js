import CryptoJS from 'crypto-js';

const SECRET_KEY = 'XTL2567';  // 加密密钥（建议从环境变量获取）

/**
 * 加密数据
 * @param {*} data 要加密的数据
 * @returns 加密后的字符串
 * 
 * localStorage.setItem('ACCESS_TOKEN', encrypt(token));
 */
export const encrypt = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

/**
 * 解密数据
 * @param {String} ciphertext 要解密的字符串
 * @returns 解密后的对象
 * 
 * const saved = localStorage.getItem('ACCESS_TOKEN');
 * if (saved) console.info(decrypt(saved));
 */
export const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}