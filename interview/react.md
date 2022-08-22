## http://www.zhufengpeixun.com/strong/html/126.11.react-1.html

## 组件如何通讯

## jsx 本质是什么

## context 是什么 有什么用途

## shouldComponentUpdate 的用途

## 描述 redux 单相数据流

## setState

- 不可变值
- 同步或异步
- 覆盖或合并

## 生命周期

- 挂载时
  - constructor
  - getDerivedStateFromProps: 将传入的 props 映射到 state 上面
  - render
  - componentDidMount
- 更新时(New Props、setState、forceUpdate)
  - getDerivedStateFromProps: 将传入的 props 映射到 state 上面
  - shouldComponentUpdate(New Props、setState)
  - render
  - getSnapshotBeforeUpdate: 相当于 beforeUpdate 返回值将作为 componentDidUpdate 的参数
  - componentDidUpdate
- 卸载时
  - componentWillUnMount
- 已经废弃的
  - 3 个
    - componentWillMount(挂载时 render 之前)
    - componentWillReactiveProps
    - componentWillUpdate(更新时 render 之前)
  - render 阶段 commit 阶段
  - 被删除的都是 render 阶段的
  - 被删除原因
    - 可能会被执行多次 造成副作用(网络请求)

## react hooks

- 只能在函数组件中使用
- useState
  - `const [state, setState] = useState(initialState);`
  - 接收一个初始化 state 或 函数
- useReducer
  - `const [state, dispatch] = useReducer(reducer, initialArg, init);`
  - reducer => dispatch 调用函数
  - initialArg => 初始化状态
  - init => 状态处理函数
- useEffect => effect
  - `useEffect(cb, [prop])`
- useLayoutEffect
  - 会在 dom 变更之后同步调用 effect
- useContext => inject
  - `let {state,dispatch} = useContext(React.createContext())`
  - 接收 上级 Provider 提供的数据
- useMemo
- useCallback
- useRef => ref
  - current 会被设置成初始值
  - 如果在子组件上使用 将会被传入到子组件中
  ```js
  function Child(props, ref) {
    return <input type="text" ref={ref} />
  }
  ```
- useImperativeHandle

  - 可以将子组件的方法暴露给父组件

- 路由 hook
  - useParams
  - useRouteMatch
  - useLocation
  - useHistory

## useLayoutEffect 和 useEffect 的区别

- useEffect 在 render 结束后执行，性能更好；
- useLayoutEffect 会在 DOM 更新完成后立即执行，会阻塞浏览器的绘制。
- 多数情况下，使用 useEffect，但有些跟视图有关的副作用想要第一时间呈现给用户，那么我们就可以使用 useLayoutEffect

## useMemo 和useCallBack的区别
