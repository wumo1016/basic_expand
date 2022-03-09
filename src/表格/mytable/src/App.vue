<template>
  <wm-table
    :columns="columns"
    :data="tableData"
    :selectedData="selectedData"
    stripe
    border
    @changeData="changeData"
  ></wm-table>

  {{ selectedData }}
</template>

<script setup>
import { ref } from 'vue'
import { columns, tableData } from './mock'
import WmTable from './wm-table.vue'

const selectedData = ref([])
const changeData = value => {
  selectedData.value = value
}
</script>

<style lang="stylus">
*{
  padding 0
  marin 0
  box-sizing border-box
}
</style>
