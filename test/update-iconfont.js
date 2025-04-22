/*
 * @Description: 更新 iconfont 图标
 * @Author: wyb
 * @LastEditors: wyb
 * @LastEditTime: 2025-04-22 11:08:51
 */
import chalk from 'chalk'
import ora from 'ora'
import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import axios from 'axios'

const loginUrl = 'https://www.iconfont.cn/login' //登录页面url
const loginRequestUrl = 'https://www.iconfont.cn/api/account/login.json' // 登录请求url
const projectLibraryUrl = 'https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=4900111' // 项目管理url

const username = '15713881013'
const password = '108116wyb'

const spinner = ora()
// 信息打印
const chalkGreen = msg => console.log(chalk.green(msg))
const chalkYellow = msg => console.log(chalk.yellow(msg))
const chalkRed = msg => console.log(chalk.red(msg))
const spinnerStart = msg => spinner.start(chalk.green(msg))
const spinnerSucceed = msg => spinner.succeed(chalk.green(msg))

// 文件输出路径
const outputPath = path.join(__dirname, '../src/assets/icons') // 输出路径

/**
 * @author: wyb
 * @description:
 */
const createBrowser = async () =>
  await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
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
    page.waitForResponse(response => response.url().includes(loginRequestUrl))
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
  spinnerStart('开始下载文件')
  const response = await axios.get(`https:${url}`)
  await Promise.all(
    response.data
      .match(/url\(.+?\?/g)
      .map(url => url.slice(5, -1))
      .map(async url => {
        const response = await axios.get(`https:${url}`, { responseType: 'stream' })
        const filePath = path.resolve(outputPath, url.includes('ttf') ? 'iconfont.ttf' : 'iconfont.svg')
        response.data.pipe(fs.createWriteStream(filePath))
      })
  )
  spinner.succeed()
}

/**
 * @author: wyb
 * @description: 执行脚本
 */
const runScript = async () => {
  const browser = await createBrowser()
  chalkGreen('✔ 打开Browser')
  const page = await browser.pages().then(e => e[0])
  chalkGreen('✔ 打开Page')

  await login(page, username, password).catch(e => {
    spinnerSucceed('✔ 已登录，无需重新登录')
  })

  // 登录成功后，打开项目库页面
  await pageGo(page, projectLibraryUrl)

  // 获取下载 Url
  spinnerStart('获取下载 Url')
  await page.waitForSelector('#J_cdn_type_fontclass', { timeout: 10000 })
  const url = await page.$eval('#J_cdn_type_fontclass', ele => {
    return ele.getAttribute('href')
  })
  spinnerSucceed('已获取下载 Url')

  updateIconfont(url)

  // spinnerSucceed('成功获取图标库最新数据')
  // let project = projects[0]
  // project.fontClass = await getFontClass(page, id)
  // if (isRelogin) {
  //   await logout(page)
  //   isNeedLogin = true
  // }
  // if (isCloseBrowser) {
  //   await page.close()
  //   chalkGreen('✔ 关闭Page')
  //   await browser.close()
  //   chalkGreen('✔ 关闭Browser')
  //   page = null
  //   browser = null
  //   isFirstEnter = true
  //   isNeedLogin = true
  // }
  // chalkGreen(`✔ 图标库:${name} 数据更新完成🎉🎉🎉`)
  // return project

  chalkGreen(`✔ 图标库更新完成🎉🎉🎉`)

  // spinner.succeed()
}

runScript()
