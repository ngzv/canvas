// 验证码相关工具函数
// - `import { canvasCaptcha, captcha } from '@/utils/captcha';`
// - `const captcha = captcha();`
// - `const captchaUrl = canvasCaptcha(captcha);`
// - captchaUrl 验证码图片 URL 用于显示验证码图片

/**
 * 生成随机验证码字符串
 * @returns 4位 随机验证码字符串
 */
export function textCaptcha() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let captcha = '';
  for (let i = 0; i < 4; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}

/**
 * 通过 Canvas 生成验证码图片 URL 用于显示验证码图片 
 * @param {string} sourceCaptcha 源验证码字符串
 * @returns 验证码图片 URL
 */
export function canvasCaptcha(sourceCaptcha) {

  const captcha = sourceCaptcha;
  // 使用一个简单的 Canvas 生成验证码
  const canvas = document.createElement('canvas');
  canvas.width = 140;
  canvas.height = 40;
  const ctx = canvas.getContext('2d');
  
  // 填充背景色
  ctx.fillStyle = '#f3f3f3';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 绘制验证码文本
  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // 添加一些干扰线
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }
  
  // 添加一些干扰点
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  // 绘制文本
  for (let i = 0; i < captcha.length; i++) {
    ctx.save();
    ctx.translate(20 * i + 40, 20);
    ctx.rotate((Math.random() - 0.5) * 0.4);
    ctx.fillStyle = `rgb(${Math.random() * 100},${Math.random() * 100},${Math.random() * 100})`;
    ctx.fillText(captcha[i], 0, 0);
    ctx.restore();
  }
  
  return canvas.toDataURL();
}
