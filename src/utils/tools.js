/**
 * 文件下载工具函数
 * @param {Object} response - 响应对象，包含数据和头部信息
 * @param {string} name - 默认文件名，默认为当前时间戳
 */
export function fileDownload(response, name = new Date()) {

  // 从响应头中提取文件名
  // const contentDisposition = response.headers.get('content-disposition');
  // const match = contentDisposition.match(/fileName=([^;]*)/);
  // const fileName = match[1];
  // const decodeFileName = decodeURIComponent(fileName);
  // decodeFileName = decodeURIComponent(decodeFileName);
  // name = decodeFileName

  let contentType = response.data.type;
  if (!contentType) {
    // 获取响应头中的 MIME 类型（作为辅助判断）
    contentType = response.headers.get('content-type');
  }

  // 创建 Blob 对象 （`application/octet-stream` 通用格式，需和文件名和类型一致，即设置下载文件名的时候指定的文件名和类型）
  const blob = new Blob([response.data], { type: contentType || 'application/octet-stream' });

  // 兼容不同浏览器的 URL 对象
  let url = window.URL || window.webkitURL || window.moxURL;
  url = url.createObjectURL(blob);
  
  // 创建一个链接并设置下载属性
  const link = document.createElement('a');
  link.href = url;
  link.style.display = 'none';
  link.setAttribute('download', name);

  // 将链接添加到 DOM 中，模拟点击
  document.body.appendChild(link);
  link.click();

  // 移除创建的链接和释放 URL 对象
  window.URL.revokeObjectURL(url);
  document.body.removeChild(link);
}

/**
 * 获取文件扩展名
 * @param {string} filename - 文件名
 * @returns {string} - 文件扩展名（小写，不包含点）
 */
export function fileNameExtension(filename) {
  if (!filename || typeof filename !== 'string') return '';
  
  const parts = filename.split('.');
  if (parts.length <= 1) return '';
  
  return parts.pop().toLowerCase();
}

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @param {number} [decimals=2] - 保留小数位数
 * @returns {string} - 格式化后的文件大小
 */
export function fileSizeFormat(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}