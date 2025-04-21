## 响应式使用

```ts
import { useSelector } from 'react-redux'
const token = useSelector((state: TState) => state.global.token)

store.dispatch(setToken(token))
```
