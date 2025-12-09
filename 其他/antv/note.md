## path(https://blog.csdn.net/chenjiebin/article/details/120775166)

- M: 绘制的起止点 // x 坐标 y 坐标
- L: 绘制从上一个点到下一个点的直线 // x 坐标 y 坐标
- H: 绘制一条水平直线 // x 坐标
- V: 绘制一条垂直直线 // y 坐标
- C: 三次贝塞尔曲线
- Q: 二次贝塞尔曲线
- A: 圆弧

```js
// x半径 y半径 旋转角度 大弧(1)/小狐(0) 顺时针(1)/逆时针(0) 终点x 终点y
const path = [
  ['M', 0, rectHieght / 2],
  ['A', iconSize / 2, iconSize / 2, 0, 0, 0, iconSize, rectHieght / 2]
]
// M移动的位置就是圆弧起始位置
```

- Z: 从结束点到开始点画一条直线，形成一个闭合的区域
