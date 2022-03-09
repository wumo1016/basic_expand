<template>
  <div class="table_wrapper">
    <table :class="['tabel', { border, stripe }]">
      <!-- 表头 -->
      <thead>
        <tr>
          <th class="check_box">
            <input
              type="checkbox"
              :checked="checkAllStatus"
              :indeterminate="indeterminate"
              @change="changeAll"
            />
          </th>
          <th v-for="{ key, title } in columns" :key="key">
            {{ title }}
          </th>
        </tr>
      </thead>
      <!-- 表体 -->
      <tbody>
        <tr v-for="row in data" :key="row.id">
          <td class="check_box">
            <input
              type="checkbox"
              @change="changeItem(row, $event)"
              :checked="selectedIds.includes(row.id)"
            />
          </td>
          <td v-for="{ key } in columns" :key="key">
            {{ row[key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import deepClone from 'lodash/cloneDeep'
import { computed } from 'vue'
// props
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  data: {
    type: Array,
    default: () => []
  },
  selectedData: {
    type: Array,
    default: () => []
  },
  border: {
    type: Boolean,
    default: false
  },
  stripe: {
    type: Boolean,
    default: false
  }
})
const selectedIds = computed(() => props.selectedData.map(v => v.id))
// emits
const emit = defineEmits(['changeData'])
// checkbox事件
const changeItem = (row, e) => {
  const list = deepClone(props.selectedData)
  if (e.target.checked) {
    list.push(row)
  } else {
    const idx = list.findIndex(v => v.id === row.id)
    list.splice(idx, 1)
  }
  emit('changeData', list)
}
// 计算全选框状态
const checkAllStatus = computed(() => {
  return props.data.length === props.selectedData.length
})
const indeterminate = computed(() => {
  const len = props.selectedData.length
  return len > 0 && len < props.data.length
})
// 全选变化
const changeAll = e => {
  emit('changeData', e.target.checked ? props.data : [])
}
</script>

<style scoped lang="stylus">
.table_wrapper{
  width 80%;
  margin 0 auto;
  table{
    width 100%;
    border-spacing 0
    border-collapse collapse
    &.border {
      th, td {
        border 1px solid #ccc;
      }
    }
    &.stripe {
      tbody {
        > tr:nth-child(even) {
          background #eee
        }
      }
    }
    th, td {
      border-bottom 1px solid #ccc
      padding 5px;
    }
    th {
      background #eee
    }
    .check_box {
      width 50px
      text-align center
      padding-right 8px
    }
  }
}
</style>
