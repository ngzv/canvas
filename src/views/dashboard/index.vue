<template>
  <div class="dashboard-container">
    <!-- DASHBOARD -->
    <TableList class="table-list" :columns="columns" :dataSource="dataSource" :pagination="pagination"></TableList>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TableList from '@/components/tableList/index.vue';

const columns = ref([
  {
    title: '姓名',
    dataIndex: 'name',
    resizable: true,
    key: 'name',
    width: 130
  },
  {
    title: '年龄',
    dataIndex: 'age',
    resizable: true,
    key: 'age',
    width: 100
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  }
]);

const dataSource = ref([
  {
    key: '1',
    name: '张三',
    age: 25,
    address: '北京市海淀区'
  },
  {
    key: '2',
    name: '李四',
    age: 30,
    address: '上海市浦东新区'
  }
]);

const pagination = ref({
  total: 2,
  current: 1,
  pageSize: 20
});

</script>

<style scoped lang="less">
.dashboard-container {
  width: 100%;
  height: 100%;
  margin: 0px auto;
  background-color: #FFFFFF;

  .table-list {
    width: 100%;
    height: 100%;
  }
}
</style>