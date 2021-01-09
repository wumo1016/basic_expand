// 对资源进行离线缓存 serviceWorker
const CACHE_NAME = 'cache_v' + 3
const CACHE_LIST = [ // 缓存列表
  '/',
  '/index.html',
  '/index.js',
  '/index.css',
  '/api/list',
  '/manifest.json',
  '/icon.png',
]

async function fetchAndSave(request) {
  const res = await fetch(request) // 数据流
  const cloneRes = res.clone() // 拷贝一份数据流 因为数据流使用过一次以后 就不能再使用
  const cache = await caches.open(CACHE_NAME)
  cache.put(request, cloneRes) // 更新缓存
  return res
}

// 当断网时 需要拦截请求 使用缓存结果
// 对请求作拦截
// 添加这个方法后 浏览器搜索框尾部就会出现一个加号
self.addEventListener('fetch', e => {
  // 如果时静态资源
  const url = new URL(e.request.url)
  if (url.origin !== self.origin) {
    return
  }
  // 缓存策略 缓存最新的 如果接口是变化的 最好将数据更新到缓存中
  if (url.pathname.startsWith('/api')) {
    e.respondWith(fetchAndSave(e.request).catch(res => { // 先请求接口，接口不同就拿缓存
      return caches.match(e.request)
    }))
    return
  }
  // 拿缓存
  // 如果断网，就会抛出异常，走catch,将缓存的东西响应给浏览器
  e.respondWith(fetch(e.request).catch(res => {
    return caches.match(e.request)
  }))
})

// 预先将缓存列表的数据缓存起来
async function preCache() {
  const cache = await caches.open(CACHE_NAME) // 创建缓存空间
  await cache.addAll(CACHE_LIST)
  await self.skipWaiting()
}

// 只要 sw.js 文件变化 就会重新执行
// 当 serviceWorker 安装 主动需要跳过等待 第一次安装才执行
self.addEventListener('install', e => {
  // 等待 Pormise 执行完成
  e.waitUntil(preCache())
})

// 清除以前的缓存
async function clearCache() {
  const keys = await caches.keys()
  return Promise.all(keys.map(key => {
    if (key !== CACHE_NAME) {
      return caches.delete(key)
    }
  }))
}

// 激活回调 第一次激活才执行 不是立即生效 下一次访问才生效
self.addEventListener('activate', e => {
  e.waitUntil(Promise.all([clearCache(), self.clients.claim()])) // 激活后立即让serviceWorker拥有控制权
})

self.addEventListener('push', function (e) {
  var data = e.data;
  if (e.data) {
    self.registration.showNotification(data.text());
  } else {
    console.log('push没有任何数据');
  }
})