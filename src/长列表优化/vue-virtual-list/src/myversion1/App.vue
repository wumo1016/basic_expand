<template>
  <VirtualList :size="80" :remain="20" :items="items" />
</template>

<script setup>
import VirtualList from './virtual-list.vue'

let items = []
for (let i = 0; i < 1000; i++) {
  items.push({ id: i, value: 123 })
}
</script>

<style>
#app {
  border: 1px solid blue;
}
* {
  box-sizing: border-box;
}
</style>
