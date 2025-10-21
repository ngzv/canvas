export default {
  mounted(el, binding, vnode) {
    let initial = 0;  // 初始值
    const number = el.innerText;  // 获取页面中的值
    const rate = 90;  // 定时器间隔时间
    const avgTime = number / 10;  // 10 次从0 到指定数据
    let average = number / (binding.value / avgTime);  // 得到每次定时器跳动的值
    if (isNaN(average)) {
      average = 0;
    }
    
    const timer = setInterval(() => {
      // 将得到的值设置给 count
      initial += average;
      el.innerText = initial.toFixed(0);
      // 为防止错误将初始值赋值 并 清除定时器
      if (initial > number) {
        initial = number;
        el.innerText = initial;
        clearInterval(timer);
      }
    }, rate);
  }
};