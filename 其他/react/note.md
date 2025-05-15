## 父调用字组件的方法

- 子组件用 forwardRef 包裹
- 子组件
```ts

```

## setState 获取更新后的值

```ts
// 使用回调函数
setValue(value => {
  return {
    // 返回新的值
  }
})
```

## 类似 computed 的效果

```ts
// 使用回调函数
const [count, setCount] = useState(0)
const [otherValue, setOtherValue] = useState(1)

// 使用useMemo创建一个计算属性
const computedValue = useMemo(() => {
  return count * 2 + otherValue
}, [count, otherValue]) // 依赖项数组
```
