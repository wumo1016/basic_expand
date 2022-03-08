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
        :ref="getDom"
      >
        <div class="item">{{ item.id }} {{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  nextTick,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  ref
} from 'vue'

const props = defineProps({
  size: Number,
  remain: Number,
  items: Array,
  variable: Boolean
})
// dom
const viewport = ref(null)
const scrollBar = ref(null)

const scrollItem = ref([])
const getDom = el => {
  scrollItem.value.push(el)
}

// 缓存高度 等滚动的时候 渲染页面的时候获取真实dom的高度 来更新缓存的内容 然后重新计算高度
const positions = ref([])
const cacheList = () => {
  positions.value = props.items.map((item, index) => ({
    top: index * props.size,
    height: props.size,
    bottom: (index + 1) * props.size
  }))
}
// 这是可视区的高 和 滚动条的高
onMounted(() => {
  viewport.value.style.height = props.size * props.remain + 'px'
  scrollBar.value.style.height = props.size * props.items.length + 'px'
  // 加载完毕后 需要缓存每一项的高度
  cacheList()
})

onBeforeUpdate(() => {
  scrollItem.value = []
})

onUpdated(async () => {
  await nextTick()
  // 页面渲染完成后 需要根据当前展示的数据 更新缓存区的内容
  // 根据当前显示的 更新缓存中的 height top bottom 更新滚动条的高度
  let nodes = scrollItem.value
  if (!(nodes && nodes.length > 0)) {
    return
  }
  nodes.forEach(node => {
    let rect = node.getBoundingClientRect()
    let height = rect.height
    let index = +node.getAttribute('vid')
    let oldHeight = positions.value[index].height
    let val = oldHeight - height
    if (val) {
      // 先更新自己
      positions.value[index].bottom = positions.value[index].bottom - val
      positions.value[index].height = height
      for (let i = index + 1; i < positions.value.length; i++) {
        positions.value[i].top = positions.value[i - 1].bottom
        positions.value[i].bottom = positions.value[i].bottom - val
      }
    }
  })
  scrollBar.value.style.height =
    positions.value[positions.value.length - 1].bottom + 'px'
  // this.offset = positions.value[this.start - this.prevCount]? positions.value[this.start - this.prevCount].top : 0;
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
// 滚动
const offset = ref(0)
const getStartIndex = value => {
  let start = 0,
    end = positions.value.length,
    temp = null

  while (start <= end) {
    const middleIndex = ((start + end) / 2) >> 0
    const middleValue = positions.value[middleIndex].bottom
    if (middleValue === value) {
      return middleIndex + 1
    } else if (value < middleValue) {
      if (temp == null || temp > middleIndex) {
        temp = middleIndex
      }
      end = middleIndex - 1
    } else {
      start = middleIndex + 1
    }
  }
  return temp
}
const handleScroll = () => {
  const scrollTop = viewport.value.scrollTop
  if (props.variable) {
    // 如果有传递varible 就用二分查找找到对应的记录
    start.value = getStartIndex(scrollTop)
    end.value = start.value + props.remain
    const target = positions.value[start.value - prevCount.value]
    offset.value = (target && target.top) || 0
  } else {
    start.value = (viewport.value.scrollTop / props.size) >> 0
    end.value = start.value + props.remain
    offset.value = start.value * props.size - props.size * prevCount.value
  }
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
}
</style>
