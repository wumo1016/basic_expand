## 基础

- 向上的箭头 = shift

## 常用快捷键

- ctrl+空格: 切换输入法
- shift+字母: 输入大写字母
- win+空格: 打开聚焦搜索
- win+tab: 切换应用
- win+c: 复制
- win+v: 粘贴
- win+x: 剪切
- cmd+back: 删除文件
- cmd++option+back: 永久删除文件
- cmd+h: 隐藏最前方的 app
- cmd+option+h: 隐藏除最前方以外的所有 app
- cmd+m: 最小化最前方 app 至程序坞
- cmd+w: 关闭最前方 app
- ctrl+shift+.: 显示隐藏文件夹

## 基础操作

- 卸载程序: 打开程序管理，长按图标即可
- 图片相关
  - 使用列表视图, 点击空格预览图片
  - 选中所有需要查看的图片, cmd+o 即可查看
  - 双击图片, cmd+i 查看图片参数
- chrome 控制台无法复制粘贴
  - 在控制台输入 'allow pasting'

## git 安装

- 安装 xcode 即可

## 自动连接蓝牙

```sh
# 1.查看蓝牙地址: 打开蓝牙设置, 鼠标放在已连接的设备图标上, 按住 [option + 鼠标左键] 即可查看
# 2.打开自动操作程序-新建应用程序-选择sheel脚本, 输入下面的命令 (查看blueutil的地址 where blueutil)
/opt/homebrew/bin/blueutil -d --connect [蓝牙地址]
```
