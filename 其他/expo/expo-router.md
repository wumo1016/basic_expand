## 基本介绍

- https://docs.expo.dev/router/basics/core-concepts/

## 路由传参

```ts
// 跳转
router.replace({
  pathname: '/tabs',
  params: {
    test: 123
  }
})
// 获取
import { useLocalSearchParams } from 'expo-router'
const routeParams = useLocalSearchParams()

// 更新查询参数
router.setParams({ limit: 50 })
```
