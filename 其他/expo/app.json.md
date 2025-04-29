## 文档

- 地址: https://docs.expo.dev/versions/latest/config/app/

## 安卓允许 http 协议

```json
{
  "expo": {
    "name": "plm-app", // app名称
    "slug": "plm-app", // expo中的项目名称
    "android": {
      "dangerouslyAllowHTTP": true
    }
  }
}
```

## 初始化项目 id

```sh
eas init -id [projectId]
```
