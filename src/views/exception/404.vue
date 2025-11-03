<template>
  <div class="exception-container">
    <h1>404错误!</h1>
    <h2>找不到网页!</h2>
    <h6>对不起,您正在寻找的页面不存在;尝试检查URL的错误,然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。</h6>
    <h5>
      <router-link to="/">返回首页</router-link>
      <a href="javascript:void(0)" @click="back">返回上一页</a>
    </h5>
    <img :src="ExceptionPng" width="350" height="350" alt="404.png" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Png404 from '@/assets/exception/404.png';

const route = useRoute();
const router = useRouter();

const ExceptionPng = ref(Png404 + '?' + new Date());

function back() {
  if (route.query.noGoBack) {
    router.push({ path: '/' });
  } else {
    router.go(-1);
  }
}
</script>

<style scoped lang="less">
.exception-container {
  width: 350px;
  margin: 0px auto;
  color: #858687;

  h1 {
    margin-top: 30px;
    font-size: 50px;
    font-weight: 700;
    color: #585858;
  }

  h5 {
    margin-bottom: 30px;
  }

  img {
    border: 1px solid #F1F2F3;
  }

  a {
    color: #008589;
    text-decoration: none;
    margin-right: 10px;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>