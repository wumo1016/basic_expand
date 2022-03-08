<template>
  <VirtualList :size="40" :remain="20" :items="items" variable />
</template>

<script setup>
import VirtualList from './virtual-list.vue'
import Mock from 'mockjs'

let items = []
for (let i = 0; i < 1000; i++) {
  items.push({ id: i, value: Mock.Random.sentence(5, 50) })
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
