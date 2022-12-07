## path

- 画圆弧

```js
// x半径 y半径 旋转角度 大弧(1)/小狐(0) 顺时针(1)/逆时针(0) 终点x 终点y
const path = [
  ['M', 0, rectHieght / 2],
  ['A', iconSize / 2, iconSize / 2, 0, 0, 0, iconSize, rectHieght / 2]
]
// M移动的位置就是圆弧起始位置
```
