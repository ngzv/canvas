<template>
  <div class="home">
    <!-- id 标识元素唯一性，方便通过 document.getElementById 方法获取元素； 
      width、height 定义画布的宽度和高度，单位为像素；
    -->
    <canvas id="canvas" width="800" height="600">
      <!-- 浏览器不支持 Canvas 绘图时显示的内容 -->
      浏览器不支持 Canvas 绘图！请下载现代浏览器。
      <a href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank">Chrome</a>
    </canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

defineProps({
  msg: String,
})

onMounted(() => {
  // 获取画布元素
  let canvas = document.getElementById('canvas')
  // 检查是否成功获取到画布元素
  if (!canvas) {
    console.error('未找到画布元素！')
    return
  }

  // 判断是否支持 Canvas (不支持说明浏览器极其老旧，10年前？)
  if (!canvas.getContext) {
    console.error('浏览器不支持 Canvas 绘图！')
    return
  }

  // 获取绘图上下文
  let ctx = canvas.getContext('2d')
  // 检查是否成功获取到绘图上下文
  if (!ctx) {
    console.error('未获取到绘图上下文！')
    return
  }

  // 绘制矩形（x, y, width, height）
  ctx.fillRect(10, 10, 100, 100)

  // 输出绘图上下文信息
  console.info(ctx)
})
</script>

<style scoped lang="less">
.home {
  width: 100%;
  margin: 0px auto;
}
</style>
