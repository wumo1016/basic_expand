## pnpm 的优点
- 快: 是同类型工具速度的两倍
- 支持单体仓库: monorepo
- 权限严格: pnpm创建的node_modules默认并非扁平结构

## single-spa 原理

- registerApplication
  - name
  - loadApp => bootstrap mount unmount
  - activeWhen
  - customProps
- start => reroute 卸载应用 - 加载应用 - 挂载应用
- hashchange popstate => reroute
- 重写 pushstate replacestate => reroute
- 重写 window.addEventListener window.removeEventListener
  - 收集了子应用内监听的原生事件
  - 在子应用 load => bootstrap 之后执行

## qiankun 原理

- 预加载
  - 可以通过 prefetch 配置加载模式
    - true 在第一次子应用挂载后加载
    - all 在 start 立即加载所有自已子应用
    - array 只加载在 array 中的子应用 在第一次子应用挂载后加载
    - function 返回两个数组 一个是在子应用挂载后加载的子应用 和 立即加载的子应用
  - 原理
    - 通过 import-html-entry 拿到所有 script 和 style
    - 然后通过 fetch 请求 并把请求结果缓存起来
- js 隔离
  - 通过快照沙箱和代理沙箱 然后通过函数自执行的方式将 proxy 传进去 实现对 window 的隔离
- 样式隔离
  - 实验性的样式隔离 在所有选择器前面加上的一个前缀 div[data-qiankun="appName"] 因为最终的子应用外面或包裹带有这样一个属性的 div
  - shadow DOM
- 全局状态管理
  - 自己定义一个全局状态 进行事件订阅派发

## 前端常见优化

- 减少 http 请求 资源合并
- 资源压缩
- 合理设置缓存
- 使用 cdn 加速
- dns-prefetch
- css 在上 js 在下
- 加载 css 时使用 link 而不是@import
- 不影响显示的 js 文件使用 defer 或 async 异步加载
- 图片懒加载

## 模块化的区别以及好处

- 分类
  - AMD(define 定义 require 获取) ---- 浏览器环境
  - CMD(都使用 define 定义 使用 define 的回调函数的参数 exports 定义 参数 require 获取 ) ---- 浏览器环境
  - COMMONJS(module.exports exports require) ---- node 环境
  - UMD ---- 通用(AMD CMD COMMONJS)
  - ESM ---- ES6 规范(import export export default)
- 模块化的好处
  - 避免命名冲突
  - 结构清晰 降低耦合
  - 复用性高 可维护性高

## commomjs 与 esm 的区别

- 值的加载(针对于常量)
  - commomjs: 输出的是一个值的拷贝
  - esm: 输出的是值的引用
- 加载时机
  - commomjs: 是运行时加载
  - esm: 是编译时输出接口
- 循环加载
  - commomjs: 遇到循环加载时 输出的是当前已经执行的那部分值
  - esm: 输出最终的值
- this
  - commomjs: 当前模块
  - esm: undefined

## git 常用操作

- `git add xxx` 将本地文件添加到暂存区
- `git commit` 将暂存区的文件提交到本地仓库
- `git push origin xxx` 将本地分支推送到远程分支
- `git checkout xxx` 迁出到目标分支
- `git merge xxx` 将当前分支合并到目标分支
- `git cherry-pick [hash]` 挑拣 合并指定一次的提交
- `git fetch origin --prune` 更新本地分支

## 线程和进程

- 进程：通俗的讲就是一个程序
- 线程：线程是进程中一个更小的单位 描述了执行一段指令所需要的时间

## web 安全防范

- XSS 攻击：想尽一切办法将可执行的代码注入到网页中
  - 持久型：就是攻击的代码被服务端写入到服务器中
  - 非持久型：一般通过修改 url 的方式加入攻击代码
  - 解决：对用户输入的特殊字符进行转义
- CSRF：跨站请求伪造
  - 用户构造一个后端请求地址 诱导用户点击 或者通过某些途径自动发起请求
  - 如果用户在登录的状态下 后端就以为是用户自己在操作 从而进行响应的逻辑
  - 防范：
    - 请求时携带验证信息 token 等
    - 阻止第三方网站请求接口
    - get 请求不对数据进行修改
- 点击劫持
  - 就是用户将目标网站使用 iframe 嵌入到自己的网站 然后将 iframe 设置成透明
  - 然后在网页上放一个按钮让用户点击 实际上点击的是 iframe
  - 防范：
    - 通过设置 http 响应头 设置本网页不能通过 iframe 显示
    - 通过 js 检测 如果当前页面是通过 iframe 显示的 直接隐藏所有内容

## linux 常见命令

- `ls` 查看当前目录下所有的文件和文件夹
- `cd xx` 进入 xx 目录
- `cd ..` 返回上一目录
- `cd /` 返回根目录
- `mkdir xx` 创建 xx 文件夹
- `mkdir -p a/b/c` 递归创建目录
- `touch xx` 创建 xx 文件
- `rm -f xx` 删除文件 xx
- `rm -rf xx` 删除文件夹 xx
- `which xx` 查看 xx 文件所在路径

## docker 常用命令

- 查看 docker 信息
  - `docker version` 查看 docker 版本
  - `docker info` 查看 docker 信息
- 镜像操作
  - `docker search image_name` 检索镜像
  - `docker pull name` 下载镜像
  - `docker images` 列出所有已下载镜像
  - `docker rmi name -f` 删除镜像
- 容器操作
  - `docker run --name 容器名 -p 映射端口:容器端口 -d 镜像名` 创建容器
  - `docker ps` 查看当前正在运行的容器
  - `docker ps -a` 查看所有容器
  - `docker start name/ID` 启动容器
  - `docker stop name/ID` 停止容器
  - `docker rm name/ID` 删除容器

## webpack 常见 loader

- 样式：style-loader、css-loader、less-loader、sass-loader 等
- 文件：raw-loader、file-loader 、url-loader 等
- 编译：babel-loader 、ts-loader 等

## 如果你接到一个项目如何从头开始的

- 需求确认
  - 确认需求，要知道做什么，做成什么样
  - 确实资源，人力资源和时间资源
- 功能分析: 有多复杂 已决定后面的技术选型
- 技术选型: 选定技术框架
- 设计实现: 搭建基础框架、按功能去实现

## XSS

- 跨域脚本攻击
- 分类
  - 反射型: 通过接口向网页加入代码
  - 储存型: 通过评论等向服务器添加恶意代码
- 预防措施
  - 输入作过滤
  - 输出做转义(编码)

## CSRF

- 跨站请求伪造

## webpack 热更新原理

http://www.javascriptpeixun.cn/my/course/3588

## 为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片

- 跨域友好
- 能够完成整个 HTTP 请求
- GIF 的合法体积最小
- 不会阻塞页面加载

## 观察者模式与发布订阅模式

- 观察者模式: 被观察者发布通知，所有观察者都会收到通知
- 发布订阅模式：发布者发布通知，只有特定的订阅者才会收到通知
