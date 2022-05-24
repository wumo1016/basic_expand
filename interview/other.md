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

## 前端常见优化

- 开发阶段
  - webpack 配置多进程打包
  - 打包时缩小文件搜索范围
- 资源加载阶段
  - dns-prefetch
  - 减少 http 请求
  - 合理设置缓存
  - 资源合并与压缩
  - 使用 cdn 加速
- 页面渲染阶段
  - css 在上 js 在下
  - 加载 css 时使用 link 而不是@import
  - 不影响显示的 js 文件使用 defer 或 async 异步加载
  - 图片懒加载

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

## pnpm 的优点

- 解决体积过大的问题

## single-spa 原理

- registerApplication
  - name
  - loadApp => bootstrap mount unmount
  - activeWhen
  - customProps
- reroute 卸载应用 - 加载应用 - 挂载应用
- start => reroute
- hashchange popstate => reroute
- 重写 pushstate replacestate => reroute
- 重写 window.addEventListener window.removeEventListener

## qiankun 原理
