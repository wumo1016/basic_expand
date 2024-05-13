## 工具函数

- random: 生成随机数
- unquote: 去除双引号

## 函数

```scss
@function getWidth($n) {
  $w: 50px;
  @return $w;
}
```

## 循环

```scss
@for $i from 10 through 12 {
  div {
    width: unquote('#{$i}px');
  }
}
```
