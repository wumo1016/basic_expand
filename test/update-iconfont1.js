const chalk = require('chalk').default
const spinner = require('ora').default()
const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')
const axios = require('axios')

const loginUrl = 'https://www.iconfont.cn/login' //登录页面url
const loginRequestUrl = 'https://www.iconfont.cn/api/account/login.json' // 登录请求url
const projectLibraryUrl = 'https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=4900111' // 项目管理url

const username = '15713881013'
const password = '108116wyb'

const outputPath = path.resolve(__dirname, './')

// 信息打印
const chalkGreen = msg => console.log(chalk.green(msg))
const chalkYellow = msg => console.log(chalk.yellow(msg))
const chalkRed = msg => console.log(chalk.red(msg))
const spinnerStart = msg => spinner.start(chalk.green(msg))
const spinnerSucceed = msg => spinner.succeed(chalk.green(msg))

/**
 * @author: wyb
 * @description:
 */
const createBrowser = async () =>
  await puppeteer.launch({
    headless: true,
    args: ['--disable-gpu', '--disable-dev-shm-usage', '--no-sandbox', `--download.default_directory=${outputPath}`],
    ignoreHTTPSErrors: true,
    executablePath: undefined,
    dumpio: false,
    timeout: 5000,
    defaultViewport: {
      // 默认视窗较小，宽高建议设置一下，防止页面需要滚动或者样式乱
      width: 1366, // 页面宽度，防止默认太小点击不到
      height: 768 // 页面高度，防止默认太小点击不到
    }
  })

// 页面跳转
const pageGo = async (page, url) => await page.goto(url, { waitUntil: 'domcontentloaded' })

// 登录
const login = async (page, user, password) => {
  spinnerStart('开始登录')
  await pageGo(page, loginUrl)
  await page.waitForSelector('#userid', { timeout: 5000 })
  await page.waitForSelector('#password')
  // 先清空表单，再重新输入账号密码（切换用户登录时输入框可能有缓存）
  await page.$eval(
    '#userid',
    (input, user) => {
      input.value = user
    },
    user
  )
  await page.$eval(
    '#password',
    (input, password) => {
      input.value = password
    },
    password
  )
  // 先聚焦再失焦检测账号或密码是否合法（focus无法使用，原因不详）
  await page.click('#userid')
  await page.click('#password')
  await page.click('#userid')
  ;(await page.$('#userid-error')) && throwError('账号不合法或错误')
  ;(await page.$('#password-error')) && throwError('密码不合法或错误')
  await Promise.all([
    page.click('.mx-btn-submit'),
    page.waitForResponse(response => {
      console.log(response.json)
      return response.url().includes(loginRequestUrl)
    })
  ])
  // 登录成功后会立即跳转，如果仍在当前页面，则是账号或密码错误
  await new Promise(resolve => setTimeout(resolve, 1000))
  ;(await page.$('.mx-btn-submit')) && throwError('账号或密码错误')
  spinnerSucceed('登录成功')
}

/**
 * @author: wyb
 * @description: 更新
 * @param {*} url
 */
const updateIconfont = async url => {
  spinnerStart('开始下载zip文件')
  /** 第一步下载iconfont.zip */
  const response = await axios.get('https://at.alicdn.com/t/c/font_4900111_uy6qov36c8a.css')
  console.log(response.data)
  // const zipFilePath = path.resolve(outputPath, 'iconfont.zip')
  // response.data.pipe(fs.createWriteStream(zipFilePath))
  // response.data.on('end', async () => {
  //   /** 解压 zip */
  //   const tempPath = path.resolve(outputPath, 'temp')
  //   await extract(zipFilePath, { dir: tempPath })
  //   const result = fs.readdirSync(tempPath)
  //   const dirPath = path.resolve(tempPath, result[0])
  //   /** 替换文件  */
  //   await processExecSync(`
  //     cd ${dirPath}
  //     mv iconfont.css ../../${prefix}iconfont.css
  //     mv iconfont.js ../../${prefix}iconfont.js
  //     mv iconfont.ttf ../../${prefix}iconfont.ttf
  //     mv iconfont.woff ../../${prefix}iconfont.woff
  //     mv iconfont.woff2 ../../${prefix}iconfont.woff2
  //   `)
  //   /** 删除文件夹 */
  //   await processExecSync('rm -rf ' + tempPath)
  //   await processExecSync('rm -rf ' + zipFilePath)

  //   /** 统一添加前缀前缀 */
  //   await processExecSync(`
  //     cd ${outputPath}
  //     sed -i.bak "s/iconfont/${prefix}iconfont/g" ${prefix}iconfont.css
  //     sed -i.bak "s/.icon-/.${prefix}icon-/g" ${prefix}iconfont.css
  //     sed -i.bak "s/icon-/${prefix}icon-/g" ${prefix}iconfont.js
  //   `)
  // })

  spinner.succeed()
}

// const str = `@font-face {
//   font-family: "iconfont"; /* Project id 4900111 */
//   src: url('//at.alicdn.com/t/c/font_4900111_uy6qov36c8a.ttf?t=1745288552526') format('truetype'),
//        url('//at.alicdn.com/t/c/font_4900111_uy6qov36c8a.svg?t=1745288552526#iconfont') format('svg');
// }`

// console.log(str.match(/url\(.+?\?/g).map(url => url.slice(5, -1)))

// str
//   .match(/url\(.+?\?/g)
//   .map(url => url.slice(5, -1))
//   .map(async (url, index) => {
//     const response = await axios.get(`https:${url}`, { responseType: 'stream' })

//     const zipFilePath = path.resolve(outputPath, url.includes('ttf') ? 'iconfont.ttf' : 'iconfont.svg')

//     response.data.pipe(fs.createWriteStream(zipFilePath))
//   })

// updateIconfont()

/**
 * @author: wyb
 * @description: 执行脚本
 */
const runScript = async () => {
  const browser = await createBrowser()
  chalkGreen('✔ 打开Browser')
  const page = await browser.newPage()
  chalkGreen('✔ 打开Page')

  await page
    .target()
    .createCDPSession()
    .then(async session => {
      await session.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: outputPath
      })
    })

  await login(page, username, password).catch(e => {
    spinnerSucceed('✔ 已登录，无需重新登录')
  })

  // 登录成功后，打开项目库页面
  await pageGo(page, projectLibraryUrl)

  // 获取下载 Url
  spinnerStart('获取下载 Url')

  await page.waitForSelector('.page-manage-project .project-manage-bar .btn-group .btn-group-item')

  await Promise.all([
    // page.waitForNavigation(),
    page.click('.page-manage-project .project-manage-bar .btn-group .btn-group-item')
  ])

  // const url = await page.$eval('.page-manage-project .project-manage-bar .btn-group .btn-group-item', ele => {
  //   ele.click()
  //   return ele.getAttribute('href')
  // })

  // await page.waitForSelector('.page-manage-project .project-manage-bar .btn-group .btn-group-item')
  // const url = await page.$eval('.page-manage-project .project-manage-bar .btn-group .btn-group-item', ele => {
  //   return ele.getAttribute('href')
  // })

  // await page.$$eval('.project-manage-bar .type-select li', eles => {
  //   eles.map(ele => {
  //     if (ele.innerHTML.includes('Font class')) {
  //       ele.click()
  //     }
  //   })
  // })
  // await page.waitForSelector('.project-manage-bar .type-select el', { timeout: 20000 })
  // const curEle = await page.$eval('.project-manage-bar .type-select el', ele => {
  //   return ele.innerHTML()
  // })

  // console.log(curEle)

  // await page.waitForSelector('#J_cdn_type_fontclass')
  // const url = await page.$eval('#J_cdn_type_fontclass', ele => {
  //   return ele.innerHTML()
  // })

  const url = ''

  await new Promise(resolve => setTimeout(resolve, 5000))

  spinnerSucceed(`已获取下载 Url ${url}`)

  await page.close()
  chalkGreen('✔ 关闭Page')
  await browser.close()
  chalkGreen('✔ 关闭Browser')

  chalkGreen(`✔ 图标库更新完成🎉🎉🎉`)
}

runScript()
