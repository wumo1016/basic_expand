window.log = console.log

const ul = document.querySelector('ul')
async function getList() {
  const res = await fetch('/api/list')
  const data = await res.json()

  let str = ''
  data.forEach(link => {
    str += `<li><img src="${link}" alt="" /></li>`
  });
  ul.innerHTML = str
}

getList()

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
const publicKey = 'BKn9WZWSFKaRlWfxwg32xV5M_IYr_nUFRQnS8tb_fR_1X1Ga_xP2TGfObHtKZzDeVBSJfoNasD_-N5qnYyg5enc';
const convertedVapidKey = urlBase64ToUint8Array(publicKey); // 通过公钥通信确保安全, 类型要求是ArrayBuffer

// 注册 serviceWorker 等待资源加载完毕后再开
window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.register('/sw.js')

    // 兼容性差
    // 等待serviceWorker激活成功
    await navigator.serviceWorker.ready;
    const pushSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    })
    // pushSubscription 可以推送消息 将它转交给服务器 服务器可以用它来了通知 pushService
    fetch('/add-sub', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(pushSubscription)
    })
  }
})