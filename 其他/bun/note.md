## 常见命令

```sh
# 运行文件
bun run index.js

# 检测修改运行
bun run --watch index.js

# 打包文件
bun build index.js --outdir dist

# 安装依赖
bun install

# 安装 npm 包
bun add lodash

```

## 内置开发服务器

```js
// 新建 server.js 文件
import { serve } from 'bun'

serve({
  port: 3000,
  fetch(req) {
    return new Response('Hello, Bun!')
  }
})

// 然后运行
bun run server.ts
```
