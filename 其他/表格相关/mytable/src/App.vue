<template>
  <wm-table
    :columns="columns"
    :data="tableData"
    :selectedData="selectedData"
    :orderBy="OrderBy"
    stripe
    border
    @changeData="changeData"
    @changeOrderBy="changeOrderBy"
    :height="200"
  ></wm-table>

  {{ selectedData }}
</template>

<script setup>
import { ref } from 'vue'
import { columns, tableData, orderBy } from './mock'
import WmTable from './wm-table.vue'

const selectedData = ref([])
const changeData = value => {
  selectedData.value = value
}

const OrderBy = ref(orderBy)
const changeOrderBy = value => {
  OrderBy.value = value
}
</script>

<style lang="stylus">
*{
  padding 0
  marin 0
  box-sizing border-box
}
</style>
