<template>
  <div class="exception-container">
    <h1>401错误!</h1>
    <h2>您没有访问权限!</h2>
    <h6>对不起,您没有访问权限,请不要进行非法操作;您可以返回主页面或上一页。</h6>
    <h5>
      <router-link to="/">返回首页</router-link>
      <a href="javascript:void(0)" @click="back">返回上一页</a>
    </h5>
    <img :src="ExceptionPng" width="350" height="350" alt="401.png" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Png401 from '@/assets/exception/401.png';

const route = useRoute();
const router = useRouter();

const ExceptionPng = ref(Png401 + '?' + new Date());

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