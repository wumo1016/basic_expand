## 简介

- [地址](https://docs.deno.com)
- 特点
  - 内置 TypeScript 支持
  - 支持 npm 包管理
  - 内置 Web 服务器
  - 无服务器部署

## 安装

```bash
# win
irm https://deno.land/install.ps1 | iex
```

## 初始化

```bash
deno init
```

## [包管理地址](https://jsr.io/)

## 权限

```bash
# 允许读取文件系统
deno run --allow-read index.js

# 允许写入文件系统
deno run --allow-write index.js

# 允许环境变量
deno run --allow-env index.js

# 允许网络请求
deno run --allow-net index.js
```
