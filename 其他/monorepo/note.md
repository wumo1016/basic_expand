## 方案

- mutirepo
  - 每个项目都是一个独立的仓库
- monorepo
  - 所有项目都在一个仓库中

## 常见管理工具

- pnpm
- npm
- yarn
- lerna
- turbo
- Nx
- rush

## pnpm 方案

```sh
# 根目录新建 pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'

# 根目录初始化
pnpm --workspace-root init

# 子包初始化 进入子包目录
pnpm init

# 依赖版本控制 在 package.json 中指定依赖版本

{
  "engines": {
    "node": ">=21.0.0",
    "pnpm": ">=10.23.0",
    "npm": ">=9.6.7"
  }
}

# 严格遵循 package.json 中的依赖版本
# 根目录添加 .npmrc
engines-strict=true
```
