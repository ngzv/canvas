import { useIntersectionObserver } from '@vueuse/core'

export default {
  mounted(el, binding, vnode) {
    const { stop } = useIntersectionObserver(el, ([{ isIntersection }]) => {
      // 进入视口区域
      // 才把绑定的值赋值给控件去加载
      if (isIntersection) {
        el.src = binding.value
        stop()
      }
    })
  }
}