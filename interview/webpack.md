## 常见 loader

- 样式：style-loader、css-loader、less-loader、sass-loader 等
  - css-loader: 打包 css
  - style-loader: 将打包后的 css 以 style 链接的形式添加到 html 中
  - postcss-loader: 加浏览器前缀, 以满足兼容性
- 文件：raw-loader、file-loader、url-loader 等
  - file-loader: 处理引入的图片
  - url-loader: 有条件将图片转换为 base64 URL
- 编译：babel-loader、ts-loader 等
  - babel-loader: 转换高级 ES6+代码

## loader 的作用

- 将 webpack 不认识的内容转化为认识的内容

## 常见 plugin

- html-webpack-plugin: 将打包后的 js 自动嵌入到 html 中
- clean-webpack-plugin: 自动清空打包目录

# plugin 的作用

- 贯穿 webpack 的生命周期, 执行特定的任务

# loader 和 plugin

- loader 一般针对特定类型的文件执行操作
- plugin 在任何地方都可以执行

# Webpack 层面的性能优化

- 优化开发构建速度
  - 设置路径别名(alias)
  - 省略后缀名(extensions)
  - include/exclude: 指定解析目录和排除目录 (exclude 优先级更高)
  - 不解析第三方库(noParse)
  - 开启多进程打包(thread-loader)
- 优化构建结果
  - 查看构建结果(webpack-bundle-analyzer)
  - 压缩 css(optimize-css-assets-webpack-plugin)
  - 压缩 js(terser-webpack-plugin)
- 优化运行体验
  - 分包(splitChunks)
  - preload 预加载资源

# 如何编写 loader

- 就是一个函数
- 最主要接收的参数就是 source, 其实就是将 source 转换为另一种形式的代码

# 如何编写 plugin

- 创建一个类
- 获取 options
- apply 函数

# Webpack optimize 有配置过吗？可以简单说说吗？

# Webpack 打包构建流程是怎样的？

- 初始化参数
  - 将命令行参数等与配置文件进行合并
- 开始编译
  - 初始化编译对象
  - 注册所有插件, 监听 webpack 构建生命周期, 执行对应的方法
- 确定入口
  - 根据 entry, 开始解析文件, 构建 AST 语法树, 开始遍历递归
- 编译模块
  - 根据配置模块, 对应对应的文件进行处理
- 输出文件
  - 根据模块间的依赖关系生成最终的文件, 根据 output 输出到指定的文件系统

## webpack 热更新原理

http://www.javascriptpeixun.cn/my/course/3588

# Webpack 打包中 Babel 插件是如何工作的？

# Webpack 和 Rollup 有什么相同点与不同点？

# Webpack5 更新了哪些新特性？
