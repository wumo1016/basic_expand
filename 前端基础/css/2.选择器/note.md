## 选择器优先级

- !important > 行内样式 > ID 选择器(100) > 类选择器(10) > 标签(1) > 通配符 > 继承 > 浏览器默认属性

## 伪元素

- ::before
- ::after
- ::first-line
- ::first-letter
- ::selection
- ::placeholder

## 逻辑选择器(https://mp.weixin.qq.com/s/QBEYNDJz54qcAo1IVZ45pg)

- :is
  - 将选择器列表作为参数，并选择该列表中任意一个选择器可以选择的元素
  - 不支持::before 和 ::after 两个伪元素
  - 它的优先级是由它的选择器列表中优先级最高的选择器决定的。我们不能把它们割裂开来看
  ```js
  div :is(p, #text-id) {
    color: blue;
  }
  // 比如以上的优先级是 标签选择器 + id选择器
  ```
  - 别名(matches、any 都已废弃)
- :where
  - 语法上与 :is 一致
  - 区别是 :where 的优先级永远是 0 即使是 `:where(#container)` 这样的
  - :is 也可以与 :where 组合使用
- :not
  - 用来匹配不符合一组选择器的元素
  - 它的优先级也是由选择器列表中最高的选择器决定的
- :has
  - 通过寻找符合条件的子元素来匹配父元素 例如: div:has(.p1) => 寻找包含 .p1 的 div
