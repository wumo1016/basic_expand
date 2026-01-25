## 安装 wsl(win)

```sh
# 控制栏搜索 启用/关闭 Windows 功能
# 勾选虚拟机平台, 适用于 Linux 的 Windows 子系统
# 重启
# 搜索 cmd 以管理员身份运行

# 设置默认版本为 wsl2
wsl set-default-version 2
# 更新 wsl2
wsl --update --web-download
```

## 安装 docker desktop

- [地址](https://www.docker.com/products/docker-desktop)

```sh
# 自定义安装目录(win)
start /w "" "Docker Desktop Installer.exe" install --installation-dir=E:\docker
```

- 修改镜像地址
  - 打开 docker desktop - 点击设置 - 点击 Docker Engine
  - 加入一下配置
  ```json
  {
    "registry-mirrors": [
      "https://docker.m.daocloud.io",
      "https://docker.1panel.live",
      "https://hub.rat.dev"
    ]
  }
  ```

## 常用命令

- 镜像相关
  - `docker pull [镜像名]`: 拉取镜像
    - 例如: `docker pull docker.io/library/nginx:1.19-alpine`
      - `docker.io`: 镜像仓库地址, docker 官方镜像仓库(可以省略)
      - `library`: 镜像仓库命名空间(作者名)(可以省略)
      - `nginx`: 镜像名
      - `1.19-alpine`: 镜像标签(版本号)(可以省略, 默认 latest, 拉去最新版本)
  - `docker images`: 显示所有本地镜像

- 容器相关
  - `docker create [镜像名]`: 创建容器
  - `docker run [镜像名]`: 使用镜像创建并运行容器
    - 完整示例: `docker run -d -p 8080:80 -v E:\wumo\basic_expand\docker\nginx\html:/usr/share/nginx/html -v E:\wumo\basic_expand\docker\nginx\nginx.conf:/etc/nginx/nginx.conf --name ng nginx`
    - 例如: `docker run [-d] [-p 8080:80] [-v E:\wumo\basic_expand\docker\nginx:/etc/nginx] nginx`
      - `-d`: 后台运行容器
      - `-p 8080:80`: 将容器的 80 端口映射到主机的 8080 端口(主机端口:容器端口)
      - `-v E:\wumo\basic_expand\docker\nginx.conf:/etc/nginx/nginx.conf`: 将主机的 nginx.conf 文件挂载到容器的 /etc/nginx/nginx.conf 文件(主机路径:容器路径)
      - 如果 nginx 镜像不存在, 会自动拉取
    - 其他参数
      - `--name [容器名]`: 为容器指定一个名称(容器名不能重复)
      - `-v [挂载卷名]:[容器路径]`: 将挂载卷挂载到容器的目录(挂载卷名:容器路径)
      - `-v [主机路径]:[容器路径]`: 将主机的目录挂载到容器的目录(主机路径:容器路径)
      - `-e [环境变量名]=[环境变量值]`: 设置环境变量(环境变量名=环境变量值) (可以设置多个, 例如: -e [环境变量名]=[环境变量值] -e [环境变量名]=[环境变量值])
      - `--rm`: 容器退出时自动删除容器(容器必须是运行状态)
      - `--restart [重启策略]`: 设置容器重启策略
        - `always`: 总是重启
        - `on-failure`: 失败时重启
        - `unless-stopped`: 除非手动停止, 否则一直重启
      - `--network [子网名]`: 将容器连接到指定的网络(网络名不能重复)
  - `docker rmi [镜像名/镜像ID]`: 删除镜像
  - `docker ps`: 显示正在运行的容器
  - `docker ps -a`: 显示所有容器
  - `docker start [容器名/容器ID]`: 启动容器
  - `docker stop [容器名/容器ID]`: 停止容器
  - `docker rm [容器名/容器ID]`: 删除容器
    - `-f`: 强制删除运行中的容器
  - `docker exec -it [容器名/容器ID] [/bin/bash]`: 进入容器内部
    - `/bin/bash`: 如果不存在, 可以使用 `/bin/sh` 或 `/bin/ash` 等替代
    - 退出容器
      - `exit`: 退出容器, 并停止容器
      - `Ctrl + D`: 退出容器, 并继续运行容器
    - 编辑器容器内文件
      - `cat /etc/os-release`: 查看容器内的操作系统信息, 如果是 Debian 系, 就可以使用 apt 安装软件
      - `apt update`: 更新软件源
      - `apt install vim`: 安装 vim 编辑器
  - `docker inspect [容器名/容器ID]`: 查看容器详细信息

## docker hub 官方镜像仓库

- [地址](https://hub.docker.com/)

## 挂载

- 介绍
  - 将主机的目录挂载到容器的目录
- 分类
  - 绑定挂载
    - 例如: `docker run -d -p 8080:80 -v E:\wumo\basic_expand\docker\nginx\html:/etc/nginx/html nginx`
  - 命名卷挂载
    - 命名卷第一次使用, docker 容器会将容器内的目录挂载到命名卷上(绑定挂载则相反)
    - 例如: `docker run -d -p 8080:80 -v nginx-vol:/etc/nginx nginx`
      - `nginx-vol`: 挂载卷名
- 特点
  - 删除容器时, 宿主机上的文件不会被删除

## 挂载卷常用命令

- `docker volume create [命名卷名]`: 创建命名卷
- `docker volume inspect [命名卷名]`: 查看挂载卷
- `docker volume rm [命名卷名]`: 删除命名卷
- `docker volume prune`: 删除所有未被使用的命名卷
- `docker volume ls`: 列出所有命名卷

## 自定义镜像并上传

- 打包
  - `docker build -t [镜像名]:[标签] [Dockerfile路径]`: 创建镜像
    - `docker build -t wumo1016/nginx:1.0.0 .`: 创建 wumo1016/nginx:1.0.0 镜像
      - `wumo1016/nginx:1.0.0`: 镜像名:标签
      - `.`: Dockerfile 所在目录(当前目录)
- 上传
  - `docker login`: 登录 docker hub 官方镜像仓库
  - `docker push [镜像名]:[标签]`: 上传镜像
    - `docker push wumo1016/nginx:1.0.0`: 上传 wumo1016/nginx:1.0.0 镜像

## docker 网络

- 分类
  - Bridge 桥接
    - 介绍
      - 每个容器都有自己的网络接口, 容器之间可以通过 IP 地址通信
      - 一般是以 `172.17` 开头
    - 特点
      - 容器之间可以通过 IP 地址通信
      - 容器之间可以通过端口映射通信
    - 子网
      - `docker network create [子网名]`: 创建子网, 可以指定容器加入不同的子网
        - `docker network create nginx-net`: 创建 nginx-net 子网
      - 优点
        - 同一个子网的容器之间可以通过容器名通信
        - 跨子网不可通信
        - 使用 `docker exec -it [容器1]` 中
          - `ping [容器2]`: 可以 ping 通
            - Docker 会自动解析容器名, 并将其解析为容器的 IP 地址
  - Host 模式
    - 介绍
      - 容器直接使用主机的网络, 容器的端口映射直接映射到主机的端口(无需使用 `-p` 进行端口映射)
      - 例如: `docker run -d --network host nginx`
    - 特点
      - 容器之间可以通过 IP 地址通信
      - 容器之间可以通过端口映射通信
  - none 模式
    - 介绍
      - 容器没有网络接口, 容器之间不能通信
- 常用命令
  - `docker network ls`: 列出所有网络
  - `docker network rm [网络名/网络ID]`: 删除网络
  - `docker network inspect [网络名/网络ID]`: 查看网络详细信息
