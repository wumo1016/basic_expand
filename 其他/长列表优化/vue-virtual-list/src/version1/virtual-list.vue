<template>
  <!-- 显示区域高度 -->
  <div class="viewport" ref="viewport" @scroll="handleScroll">
    <!-- 自己构造一个滚动条 -->
    <div class="scrollBar" ref="scrollBar"></div>
    <div
      class="scroll-list"
      :style="{ transform: `translate3d(0,${offset}px,0)` }"
    >
      <div
        v-for="(item, index) in visableData"
        :key="item.id"
        :vid="item.index"
      >
        <div class="item">{{ item.id }} {{ item.value }}</div>
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
// dom
const viewport = ref(null)
const scrollBar = ref(null)
// 这是可视区的高 和 滚动条的高
onMounted(() => {
  viewport.value.style.height = props.size * props.remain + 'px'
  scrollBar.value.style.height = props.size * props.items.length + 'px'
})
// 开始结束索引az
const start = ref(0)
const end = ref(props.remain)
// 前置和后置数据
const prevCount = computed(() => {
  return Math.min(start.value, props.remain)
})
const postCount = computed(() => {
  return Math.min(props.items.length - end.value, props.remain)
})
// 显示的数据
const visableData = computed(() => {
  return props.items.slice(
    start.value - prevCount.value,
    end.value + postCount.value
  )
})

const offset = ref(0)
const handleScroll = () => {
  start.value = (viewport.value.scrollTop / props.size) >> 0
  end.value = start.value + props.remain
  offset.value = start.value * props.size - props.size * prevCount.value
}
</script>

<style>
.viewport {
  overflow-y: scroll;
  position: relative;
  border: 1px solid blue;
}
.scroll-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.item {
  border-bottom: 1px solid red;
  height: 40px;
}
</style>
