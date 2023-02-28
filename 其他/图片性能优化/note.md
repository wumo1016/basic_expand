## Alpha 通道

- 图片是否支持透明特性(除 JPEG 外基本都支持)

## WebP vs JPEG XL vs AVIF (JPEG 的替代者)

- WebP
  - 优点: 同时支持有损压缩和无损压缩, 支持透明度, 支持动画, 主要优势是有损编码表现好
  - 缺点: 编解码性能不好, 增加额外的解码时间, 但是大幅减少了文件体积(适用于大量图片的场景)
- JPEG XL(扩展名为 jxl)
  - 优点: 同时支持有损压缩和无损压缩, 支持透明度, 支持动画, 渐进式解码, 性能最好的一种
  - 缺点: 兼容性不好
- AVIF
  - 优点: 同时支持有损压缩和无损压缩, 支持透明度, 支持动画
  - 缺点: 不支持渐进式解码, 解码性能一般

## picture 标签

- 渐进增强
- 通过 <source> 给出一系列对兼容性有要求的图片
- 通过 <img> 进行兜底
- 图片最终呈现在 img 中

```html
<picture>
  <!-- 可能是一些对兼容性有要求的，但是性能表现更好的现代图片格式-->
  <source src="image.avif" type="image/avif" />
  <source src="image.jxl" type="image/jxl" />
  <source src="image.webp" type="image/webp" />

  <!-- 最终的兜底方案-->
  <img src="image.jpg" type="image/jpeg" />
</picture>
```

## 像素相关

- 设备独立像素(DIP)
  - 设备独立像素 = CSS 像素 = 逻辑像素
- 物理像素
  - 例如某手机对应的分辨率: 1334 x 750, 就表示手机在垂直和水平上所具有的像素点数
  - 单位为 pt
- 设备像素比(DPR)
  - 设备像素比 = 物理像素 / 设备独立像素

## 为不同的 DPR 的屏幕提供不同的图片

- 无脑多倍图
  - 例如在移动端需要 `300*200` 的图, 假设已经有了 dpr=3 的设备, 所以我们需要`900*600`的图
  - 缺点: 会造成资源浪费
- 使用媒体查询
  - 使用 `device-pixel-ratio` 设置不同设备比的样式
  - 缺点: 要写的代码可能太多
  ```css
  #id {
    background: url(xxx@2x.png);
  }
  @media (device-pixel-ratio: 2) {
    #id {
      background: url(xxx@2x.png);
    }
  }
  @media (device-pixel-ratio: 3) {
    #id {
      background: url(xxx@3x.png);
    }
  }
  ```
- CSS 配合 image-set 语法

  - 会根据设备比自动选中合适的图片

  ```css
  .img {
    /* 不支持 image-set 的浏览器*/
    background-image: url('../photo@2x.png');
    /* 支持 image-set 的浏览器*/
    background-image: image-set(
      url('./photo@2x.png') 2x,
      url('./photo@3x.png') 3x
    );
  }
  ```

- ## srcset 配合 1x 2x 像素密度描述符
  - src 作为兜底使用
  ```html
  <div class="illustration">
    <img
      src="illustration-small.png"
      srcset="images/illustration-small.png 1x, images/illustration-big.png 2x"
    />
  </div>
  ```

## https://juejin.cn/post/7204860462240170040
