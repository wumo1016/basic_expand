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

## 类似 Provide 和 Inject 的效果

- 父组件用 createContext 创建一个上下文
- 父组件用 Provider.Provider 包裹子组件，传递值
- 子组件用 useContext 消费值

## 表单输入最佳实践

```tsx
<KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.select({
    ios: 'padding',
    android: 'height'
  })}
  keyboardVerticalOffset={Platform.select({
    ios: 90, // 根据你的导航栏高度调整（Header height + status bar）
    android: 0
  })}
>
  <ScrollView
    keyboardShouldPersistTaps="handled"
    contentContainerStyle={{ flexGrow: 1 }}
  >
    {/* 你的输入表单 */}
  </ScrollView>
</KeyboardAvoidingView>
```
