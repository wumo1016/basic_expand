## 获取定义的 props 类型

```ts
import { ExtractPropTypes } from 'vue'
export type ButtonProps = ExtractPropTypes<typeof buttonProps>
```

## 定义作为参数的 emit 类型

```ts
import { SetupContext } from 'vue'
function useUtil(emit: SetupContext<ButtonEmits>['emit']) {}
```

## 二次封装组件如何暴露原生组件的方法

```ts
defineExpose(
  new Proxy(
    {},
    {
      has(key) {
        return key in refWidget.value
      },
      get(key) {
        return refWidget.value?.[key]
      }
    }
  )
)
```

## 二次封装组件时不一样的插槽传递方案

```vue
<template>
  <component :is="h(HelloWord, $attrs, $slots)">
</template>
<script lang="ts" setup>
import HelloWord from './HelloWord.vue'
import { h } from 'vue'
</script>
```

## 监听子组件的生命周期

```vue
<script setup>
import Comp from './Comp.vue'
const load = () => {
  console.log('加载啦234')
}
</script>

<template>
  <!-- vue2中是 @hook:mounted -->
  <Comp @vue:mounted="load" />
</template>
```
