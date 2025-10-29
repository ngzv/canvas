import request from '../utils/request';

export function captchaImage() {
  return request({
    url: '/user/captchaImage',
    method: 'get'
  });
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  });
}