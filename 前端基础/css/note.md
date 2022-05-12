## css 隔离方案

- BEM
  - 一种命名规范
  - 块（Block）、元素（Element）、修饰符（Modifier）
  - 命名时加上模块前缀 实现隔离
- css-modules

  - 依赖 css-loader
  - 它会将选择器都编译成一段哈希字符串来实现样式的隔离

  ```html
  <style module>
    .guang {
      color: red;
    }
  </style>
  <template>
    <p :class="$style.guang">hi</p>
  </template>
  <!-- 会被编译成 -->
  <style module>
    ._1yZGjg0pYkMbaHPr4wT6P__1 {
      color: red;
    }
  </style>
  <template>
    <p class="_1yZGjg0pYkMbaHPr4wT6P__1">hi</p>
  </template>
  ```

- css-in-js

  - 使用 js 语法书写 css
  - 比如 `Styled-components` 库 使用标签模板字符串语法 最终会生成一个带有 hash classname 的标签 直接使用这个标签包裹内容即可 (它的样式是放在 style 标签中 插入到 head 中)

  ```javascript
  import styled from 'styled-components';
  const Wrapper = styled.div`
      font-size: 50px;
      color: red;
  `;
  function Guang {
      return (
          <div>
              <Wrapper>内部文件写法</Wrapper>
          </div>
      );
  }
  ```

- Shadow Dom
  - 严格意义上的隔离 天然支持
  - 内部可以支持 style link 等标签
- scoped
  - vue-loader 的解决方案
  - 通过编译的方式在标签添加 data-xxx 的属性 然后给 css 选择器上[data-xxx]的属性选择器实现 css 的隔离
  ```html
  <style scoped>
    .guang {
      color: red;
    }
  </style>
  <template>
    <div class="guang">hi</div>
  </template>
  <!-- 会被编译成 -->
  <style>
    .guang[data-v-f3f3eg9] {
      color: red;
    }
  </style>
  <template>
    <div class="guang" data-v-f3f3eg9>hi</div>
  </template>
  ```

## 修改 placeholder 样式

```css
input::-webkit-input-placeholder {
  color: #babbc1;
  font-size: 14px;
}
```

## 修改输入框光标的颜色

```css
input {
  caret-color: blue;
}
```

## 移除数字类型输入框的小箭头

```css
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
```

## 自定义选中的文本样式

```css
.box::selection {
  color: red;
  background: blue;
}
```

## 设置页面灰色

```css
body {
  filter: grayscale(1);
}
```

## 选择器

- `[attr^=value]`: 选择带有属性 attr 值`开头`为 value 的元素
- `[attr$=value]`: 选择带有属性 attr 值`结尾`为 value 的元素
- `[attr*=value]`: 选择带有属性 attr 值`包含`value 的元素
- `[attr]`: 选择所有带有属性 attr 的元素
- `[attr=value]`: 选择带有属性 attr 值为 value 的元素

## position

- fixed: 当祖先元素的 transform、filter、perspective 等属于不为 none 时 容器由视口改为该祖先

## 在 calc 中使用 scss 变量

- 使用 `#{}` 包裹 例如: `height: calc(100% - #{$height})`
