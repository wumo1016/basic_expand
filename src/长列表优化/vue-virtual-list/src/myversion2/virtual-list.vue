<template>
  <div class="box" @scroll="handleScroll">
    <!-- 容纳全部数据的盒子 用于撑开滚动条 -->
    <div ref="refScroll" class="scroll_box"></div>
    <div
      ref="refVisual"
      class="visual_box"
      :style="{ transform: `translate(0, ${offset}px)` }"
    >
      <div
        v-for="item in visualData"
        :key="item.id"
        :vid="item.index"
        class="box_item"
      >
        {{ item.id }} ---- {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUpdated, ref } from 'vue'

const props = defineProps({
  size: Number,
  remain: Number,
  items: Array
})

const startIndex = ref(0)
const endIndex = ref(props.remain)
const offset = ref(0) // 偏移量
const cacheList = []

// 当前显示的数据
const itemList = computed(() =>
  props.items.map((v, index) => ({ ...v, index }))
)
const visualData = computed(() => {
  return itemList.value.slice(
    startIndex.value - prevNum.value,
    endIndex.value + postNum.value
  )
})
// 前置和后置预渲染
const prevNum = computed(() => Math.min(startIndex.value, 10))
const postNum = computed(() =>
  Math.min(props.items.length - endIndex.value, 10)
)
// dom
const refScroll = ref(null)
const refVisual = ref(null)

// 滚动事件
const getStartIndex = value => {
  let start = 0,
    end = cacheList.value.length - 1
  let temp = null
  while (start <= end) {
    const mid = ((start + end) / 2) >> 0
    const midVal = cacheList.value[mid].bottom
    if (value === midVal) {
      return mid
    } else if (value < midVal) {
      temp = mid
      end = mid - 1
    } else {
      start = mid + 1
    }
  }
  return temp
}
const handleScroll = e => {
  const scrollTop = e.target.scrollTop
  startIndex.value = getStartIndex(scrollTop)
  endIndex.value = startIndex.value + props.remain
  offset.value = cacheList.value[startIndex.value - prevNum.value]?.top || 0
}

onMounted(() => {
  // 设置总高
  refScroll.value.style.height = props.items.length * props.size + 'px'
  // 缓存数据
  cacheList.value = itemList.value.map((item, index) => {
    return {
      index: item.index,
      height: props.size,
      top: props.size * index,
      bottom: props.size * (index + 1)
    }
  })
})

onUpdated(() => {
  const children = [...refVisual.value.children]
  let max = 0
  for (const child of children) {
    const rect = child?.getBoundingClientRect()
    const vid = child.getAttribute('vid')
    max = vid
    const cur = cacheList.value[vid]
    cur.top = cacheList.value[vid - 1]?.bottom || 0
    cur.height = rect.height
    cur.bottom = cur.top + cur.height
  }
  const len = cacheList.value.length
  for (let i = max; i < len; i++) {
    const cur = cacheList.value[i]
    cur.top = cacheList.value[i - 1].bottom
    cur.bottom = cur.top + cur.height
  }
  refScroll.value.style.height =
    cacheList.value[cacheList.value.length - 1].bottom + 'px'
})
</script>

<style>
.box {
  height: 800px;
  border: 1px solid blue;
  overflow-y: auto;
  position: relative;
}
.visual_box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.box_item {
  border-bottom: 1px solid red;
}
</style>
