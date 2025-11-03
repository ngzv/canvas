<template>
  <div class="table-list">
    <a-table :columns="props.columns" :data-source="props.dataSource" :pagination="props.pagination" @resizeColumn="handleResizeColumn">
      <template #headerCell="{ column }">
        {{ column.title }}
      </template>
      <template #bodyCell="{ column, record }">
        {{ record[column.dataIndex] }}
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  dataSource: {
    type: Array,
    default: () => []
  },
  pagination: {
    type: Object,
    default: () => {}
  }
});

function handleResizeColumn(w, col) {
  col.width = w;
}
</script>

<style scoped lang="less">
.table-list {
  width: 100%;
  height: 100%;
}
</style>