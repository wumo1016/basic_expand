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
        class="box_item"
        :style="{ height: `${size}px` }"
      >
        {{ item.id }} ---- {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  size: Number,
  remain: Number,
  items: Array
})

const startIndex = ref(0)
const endIndex = ref(props.remain)
const offset = ref(0) // 偏移量

const visualData = computed(() => {
  return props.items.slice(
    startIndex.value - prevNum.value,
    endIndex.value + postNum.value
  )
})
// 前置和后置预渲染
const prevNum = computed(() => Math.min(startIndex.value, 10))
const postNum = computed(() =>
  Math.min(props.items.length - endIndex.value, 10)
)

const refScroll = ref(null)
onMounted(() => {
  // 设置总高
  refScroll.value.style.height = props.items.length * props.size + 'px'
})

const minStartIndex = computed(() => props.items.length - props.remain)
// 滚动事件
const handleScroll = e => {
  const scrollTop = e.target.scrollTop
  const value = (scrollTop / props.size) >> 0
  startIndex.value = value > minStartIndex.value ? minStartIndex.value : value
  endIndex.value = startIndex.value + props.remain
  // 设置偏移量
  offset.value = (startIndex.value - prevNum.value) * props.size
}
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
