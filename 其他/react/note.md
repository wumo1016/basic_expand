## 父调用字组件的方法

- 子组件用 forwardRef 包裹

- 子组件

```ts
import { forwardRef } from 'react'

const MyComponent = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <p>Hello, {props.name}!</p>
    </div>
  )
})
```

- 父组件

```ts
  const MyComponentRef = useRef<MyComponent>(null)
  return (
    <div>
      <MyComponent ref={MyComponentRef} name="Wumo" />
    </div>
  )
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

- 父组件用 `createContext` 创建一个上下文 `const TestContext =  createContext()`
- 父组件用 `TestContext` 包裹子组件，传递值
- 子组件用 `useContext(TestContext)` 消费值

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

## useState 与 useRef 的区别

- useState 用于管理状态，每次状态更新时，组件会重新渲染
- useRef 用于管理非状态值，不会触发组件重新渲染

## `position: absolute` 的问题

- 子元素的宽高 100% 是根据父元素的 宽高 - 子元素的 padding 来计算的

## 函数组件使用方式的区别

- `<FormWidget />`
  - 创建新的组件实例
  - 重渲染时 比较组件引用，引用变了就卸载重建
  - DOM 销毁旧的，创建新的
- `{renderWidget()}`
  - 不创建新的组件实例
  - 比较 JSX 类型，类型不变就就地更新
  - 复用已有 DOM
