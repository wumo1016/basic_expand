<template>
  <div class="viewport" ref="viewport" @scroll="handleScroll">
    <div class="scrollBar" ref="scrollBar"></div>
    <div
      class="scroll-list"
      :style="{ transform: `translate3d(0,${offset}px,0)` }"
    >
      <div
        v-for="(item, index) in visibleData"
        :key="item.id"
        :vid="item.index"
        ref="items"
      >
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: Array,
    size: Number,
    remain: Number,
    variable: Boolean
  },
  data() {
    return {
      start: 0,
      end: null,
      offset: 0
    }
  },
  computed: {
    formatData() {
      return this.items.map((item, index) => ({ ...item, index }))
    },
    visibleData() {
      let start = this.start - this.prevCount
      let end = this.end + this.nextCount
      return this.formatData.slice(start, end)
    },
    prevCount() {
      return Math.min(this.start, this.remain)
    },
    nextCount() {
      return Math.min(this.items.length - this.end, this.remain)
    }
  },
  mounted() {
    // 1.设置viewPrort的高度
    this.$refs.viewport.style.height = this.remain * this.size + 'px'
    // 2.设置滚动条高度
    this.$refs.scrollBar.style.height = this.items.length * this.size + 'px'
    // 3.计算显示范围
    this.end = this.start + this.remain
    if (this.variable) {
      this.initPosition()
    }
  },
  updated() {
    // 获取真实元素的位置 更新top和bottom;
    this.$nextTick(() => {
      let nodes = this.$refs.items
      if (!(nodes && nodes.length > 0)) {
        return
      }
      nodes.forEach(node => {
        let rect = node.getBoundingClientRect()
        let height = rect.height
        let index = +node.getAttribute('vid')
        let oldHeight = this.positions[index].height
        let val = oldHeight - height
        console.log(val)
        if (val) {
          // 先更新自己
          this.positions[index].bottom = this.positions[index].bottom - val
          this.positions[index].height = height
          for (let i = index + 1; i < this.positions.length; i++) {
            this.positions[i].top = this.positions[i - 1].bottom
            this.positions[i].bottom = this.positions[i].bottom - val
          }
        }
      })
      this.$refs.scrollBar.style.height =
        this.positions[this.positions.length - 1].bottom + 'px'
      // this.offset = this.positions[this.start - this.prevCount]? this.positions[this.start - this.prevCount].top : 0;
    })
  },
  methods: {
    initPosition() {
      // 初始化位置
      this.positions = this.items.map((item, index) => ({
        index,
        height: this.size,
        top: index * this.size,
        bottom: (index + 1) * this.size
      }))
    },
    getStartIndex(value) {
      let positions = this.positions
      let start = 0
      let end = this.positions.length
      let temp = null
      while (start < end) {
        let middleIndex = parseInt((start + end) / 2)
        let middleValue = this.positions[middleIndex].bottom
        if (value == middleValue) {
          return middleIndex + 1
        } else if (middleValue < value) {
          start = middleIndex + 1
        } else if (middleValue > value) {
          if (temp == null || temp > middleIndex) {
            temp = middleIndex
          }
          end = middleIndex - 1
        }
      }
      return temp
    },
    handleScroll() {
      let scrollTop = this.$refs.viewport.scrollTop
      if (this.variable) {
        // 算出开始的位置
        this.start = this.getStartIndex(scrollTop)
        this.end = this.start + this.remain
        this.offset = this.positions[this.start - this.prevCount]
          ? this.positions[this.start - this.prevCount].top
          : 0
        // 算出结尾位置
        // 设置偏移量
      } else {
        // 计算开始
        this.start = Math.floor(scrollTop / this.size)
        // 计算结束
        this.end = this.start + this.remain
        // 计算偏移量
        this.offset =
          scrollTop - (scrollTop % this.size) - this.prevCount * this.size
      }
    }
  }
}
</script>
<style lang="stylus">
.viewport {
  overflow-y: scroll;
  position: relative;
}

.scroll-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
