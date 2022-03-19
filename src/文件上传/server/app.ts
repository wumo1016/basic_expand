import express, { Request, Response, NextFunction } from 'express'
import logger from 'morgan'
import { INTERNAL_SERVER_ERROR } from 'http-status-codes' // 500
import createError from 'http-errors'
import cors from 'cors'
import path from 'path'
import fs from 'fs-extra'
// import multiparty from 'multiparty' // 处理上传文件的
import { mergeChunks } from './utils'

const publicPath = path.resolve(__dirname, 'public')
const tempPath = path.resolve(__dirname, 'temp')

const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'public')))

app.post('/upload/:fileName/:chunkName/:start', async (req, res) => {
  let { fileName, chunkName, start }: any = req.params
  start = isNaN(start) ? 0 : Number(start)
  const chunkDir = path.resolve(tempPath, fileName)
  if (!(await fs.pathExists(chunkDir))) {
    await fs.mkdirs(chunkDir)
  }
  const chunkFilePath = path.resolve(chunkDir, chunkName)
  const ws = fs.createWriteStream(chunkFilePath, { start, flags: 'a' })
  req.pipe(ws)
  req.on('end', () => {
    res.json({ success: true })
  })
  req.on('error', () => {
    ws.close()
  })
  // 取消请求后 需要关闭可写流 不然后续无法删除文件
  req.on('close', () => {
    ws.close()
  })
})

app.post('/merge/:fileName', async (req, res) => {
  const { fileName } = req.params
  const defaultSize = 1024 * 1024 * 100
  await mergeChunks(fileName, defaultSize)
  res.json({ success: true })
})

app.get('/verify/:fileName', async (req, res): Promise<any> => {
  const { fileName } = req.params
  // 已经存在原文件
  const exist1 = await fs.pathExists(path.resolve(publicPath, fileName))
  if (exist1) {
    return res.json({
      success: true,
      needUpload: false
    })
  }
  const chunkDir = path.resolve(tempPath, fileName)
  let uploadList: any[] = []
  const exist2 = await fs.pathExists(chunkDir)
  if (exist2) {
    uploadList = await fs.readdir(chunkDir)
    uploadList = await Promise.all(
      uploadList.map(async name => {
        const stat = await fs.stat(path.resolve(chunkDir, name))
        return {
          chunkName: name,
          size: stat.size // 当前文件的大小
        }
      })
    )
  }
  res.json({
    success: true,
    needUpload: true,
    uploadList
  })
})

/* 
app.post('/upload', async (req, res, next) => {
  const form = new multiparty.Form()
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(err)
    }
    const filename = fields.filename[0]
    const chunk = files.chunk[0]
    await fs.move(chunk.path, path.resolve(publicPath, filename), {
      overwrite: true
    })
    res.json({ success: true })
  })
})
*/

app.use((_req, _res, next) => {
  next(createError(404))
})
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || INTERNAL_SERVER_ERROR)
  res.json({
    success: false,
    err
  })
})

export default app
