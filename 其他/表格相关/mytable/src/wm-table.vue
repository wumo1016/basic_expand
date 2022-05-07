<template>
  <div class="table_wrapper" ref="refTableWrapper">
    <div
      :style="{ height: `${height}px` }"
      class="scroll-box"
      ref="refScrollBox"
    >
      <table :class="['tabel', { border, stripe }]" ref="refTable">
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
              <div class="th-head">
                <span>{{ title }}</span>
                <span v-if="key in orderBy" class="sorter">
                  <i
                    class="wm-icon wm-icon-arrow-up"
                    :class="{ active: orderBy[key] === 'asc' }"
                    @click="sort(key)"
                  ></i>
                  <i
                    class="wm-icon wm-icon-arrow-down"
                    :class="{ active: orderBy[key] === 'desc' }"
                    @click="sort(key)"
                  ></i>
                </span>
              </div>
            </th>
            <th style="width: 17px"></th>
          </tr>
        </thead>
        <!-- 表体 -->
        <tbody ref="refTbody">
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
  </div>
</template>

<script setup>
import deepClone from 'lodash/cloneDeep'
import { computed, onMounted, ref } from 'vue'
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
  },
  orderBy: {
    type: Object,
    default: () => {}
  },
  height: {
    type: Number,
    default: 300
  }
})
const selectedIds = computed(() => props.selectedData.map(v => v.id))
// emits
const emit = defineEmits(['changeData', 'changeOrderBy'])
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
// 排序
const sort = key => {
  const orderBy = deepClone(props.orderBy)
  if (orderBy[key] === 'asc') {
    orderBy[key] = 'desc'
  } else {
    orderBy[key] = 'asc'
  }
  emit('changeOrderBy', orderBy)
}
// dom
const refTableWrapper = ref(null)
const refScrollBox = ref(null)
const refTable = ref(null)
const refTbody = ref(null)

onMounted(() => {
  const copyTable = refTable.value.cloneNode() // 拷贝表格
  const thead = refTable.value.children[0]
  copyTable.appendChild(thead) // 将原来的thead移动到拷贝的表格中
  refTableWrapper.value.appendChild(copyTable)
  refTableWrapper.value.style.paddingTop =
    thead.getBoundingClientRect().height + 'px'
  copyTable.classList.add('fix-header')

  // 设置列宽
  const tds = [...refTbody.value.children[0].children].slice(1)
  const ths = [...thead.children[0].children].slice(1)
  const len = tds.length
  for (let i = 0; i < len; i++) {
    const width = tds[i].getBoundingClientRect().width
    console.log(width)
    ths[i].style.width = width + 'px'
  }
})
</script>

<style scoped lang="stylus">
.table_wrapper{
  width 80%;
  margin 0 auto;
  position relative
  .scroll-box{
    overflow auto
  }
  .fix-header{
    position absolute
    top 0
    left 0
    width 100%
  }
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
    .th-head{
      display flex
      align-items center
      .sorter {
        display inline-flex
        flex-direction column
        justify-content center
        margin-left 10px
        i{
          font-size 12px
          cursor pointer
        }
        .active {
          color blue
        }
      }
    }
    .check_box {
      width 50px
      text-align center
      padding-right 8px
    }
  }
}
</style>
