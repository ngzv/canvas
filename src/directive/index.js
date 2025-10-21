import imgPlugin from './modules/imgPlugin';
import numberChange from './modules/numberChange';

/// 注册指令
export default {
  install(app) {
    // 懒加载
    // - 使用 `<img v-img-plugin="item.picture" />`
    app.directive('img-plugin', imgPlugin);
    // 数字变化动画
    // - 使用 `<span v-number-change="count" />`
    app.directive('number-change', numberChange);
  }
};