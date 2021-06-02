## 模块化的区别
  - AMD(define定义 require获取) ---- 浏览器环境
  - CMD(都使用define定义 使用define的回调函数的参数exports定义 参数require获取 ) ---- 浏览器环境
  - COMMONJS(module.exports exports require)  ---- node环境
  - UMD ---- 通用(AMD CMD COMMONJS)
  - ESM ---- ES6规范(import export export default)

## 前端常见优化
  - 开发阶段
    - webpack配置多进程打包
    - 打包时缩小文件搜索范围
  - 资源加载阶段
    - 压缩文件 上传服务器时先压缩一遍 服务器也开始gzip压缩
    - 静态资源使用cdn
    - 设置缓存策略
  - 页面渲染阶段
    - css在上 js在下
    - 加载css时使用link而不是@import
    - 不影响显示的js文件使用defer或async异步加载

## git常用操作
  - `git add xxx` 将本地文件添加到暂存区
  - `git commit` 将暂存区的文件提交到本地仓库
  - `git push origin xxx` 将本地分支推送到远程分支
  - `git checkout xxx` 迁出到目标分支
  - `git merge xxx` 将当前分支合并到目标分支

## 线程和进程
  - 进程：通俗的讲就是一个程序
  - 线程：线程是进程中一个更小的单位 描述了执行一段指令所需要的时间

## web安全防范
  - XSS攻击：想尽一切办法将可执行的代码注入到网页中
    - 持久型：就是攻击的代码被服务端写入到服务器中
    - 非持久型：一般通过修改url的方式加入攻击代码
    - 解决：对用户输入的特殊字符进行转义
  - CSRF：跨站请求伪造
    - 用户构造一个后端请求地址 诱导用户点击 或者通过某些途径自动发起请求
    - 如果用户在登录的状态下 后端就以为是用户自己在操作 从而进行响应的逻辑
    - 防范：
        - 请求时携带验证信息 token等
        - 阻止第三方网站请求接口
        - get请求不对数据进行修改
  - 点击劫持
    - 就是用户将目标网站使用iframe嵌入到自己的网站 然后将iframe设置成透明
    - 然后在网页上放一个按钮让用户点击 实际上点击的是iframe
    - 防范：
      - 通过设置http响应头 设置本网页不能通过iframe显示
      - 通过js检测 如果当前页面是通过iframe显示的 直接隐藏所有内容

## linux常见命令
  - `ls` 查看当前目录下所有的文件和文件夹
  - `cd xx` 进入xx目录
  - `cd ..` 返回上一目录
  - `cd /` 返回根目录
  - `mkdir xx` 创建xx文件夹
  - `mkdir -p a/b/c` 递归创建目录
  - `touch xx` 创建xx文件
  - `rm -f xx` 删除文件xx
  - `rm -rf xx` 删除文件夹xx
  - `which xx` 查看xx文件所在路径

## docker常用命令
  - 查看docker信息
    - `docker version` 查看docker版本
    - `docker info` 查看docker信息
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