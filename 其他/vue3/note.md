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
