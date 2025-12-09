## 创建模板项目

- 命令: `npx create-expo-app --template [模板名]`
- 地址: https://docs.expo.dev/more/create-expo/#--template

## 创建示例项目

- 命令: `npx create-expo-app --example [项目名]`
- 所有模板: https://github.com/expo/examples

## 创建项目

````sh
# 初始化项目
npx create-expo-app@latest

# app.json 中设置 owner 为组织名

# 初始化 eas 配置
eas build:configure

# 添加安卓构建生产版本配置
# {
#   "android": {
#     "buildType": "apk"
#  }
# }

# 安装 expo-dev-client
npx expo install expo-dev-client

# 添加以下 scripts 命令
```json
{
  "start": "npm run dev",
  "dev": "expo start --dev-client",
  "pre-build:android": "expo prebuild --platform android",
  "dev-build:android": "npm run pre-build:android && eas build --profile development --platform android",
  "build:android": "npm run pre-build:android && eas build --platform android"
}
````

# 本地存储处理

npm i react-native-mmkv -S

# 持久化缓存处理

npm i @reduxjs/toolkit redux-persist react-redux -S

````

## 创建环境变量

- 创建 EAS 环境变量
  - https://expo.dev/accounts/plm-app1/projects/plm-app-inventory/environment-variables
- 拉取到本地使用

```sh
eas env:pull --environment development
````

## 打包支持 http 协议

## 检查

```sh
npx expo-docker
```
