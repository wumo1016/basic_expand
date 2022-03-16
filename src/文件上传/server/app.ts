import express, { Request, Response, NextFunction } from 'express'
import logger from 'morgan'
import { INTERNAL_SERVER_ERROR } from 'http-status-codes' // 500
import createError from 'http-errors'
import cors from 'cors'
import path from 'path'
import fs from 'fs-extra'
// import multiparty from 'multiparty' // 处理上传文件的
import { mergeChunks } from './utils'

// const publicPath = path.resolve(__dirname, 'public')
const tempPath = path.resolve(__dirname, 'temp')

const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'public')))

app.post('/upload/:fileName/:chunkName', async (req, res, _next) => {
  const { fileName, chunkName } = req.params
  const chunkDir = path.resolve(tempPath, fileName)
  const exist = fs.existsSync(chunkDir)
  if (!exist) {
    await fs.mkdirs(chunkDir)
  }
  const chunkFilePath = path.resolve(chunkDir, chunkName)
  const ws = fs.createWriteStream(chunkFilePath, { start: 0, flags: 'a' })
  req.pipe(ws)
  req.on('end', () => {
    res.json({ success: true })
  })
})

app.post('/merge/:fileName', async (req, res) => {
  const { fileName } = req.params
  const defaultSize = 1024 * 1024 * 100
  await mergeChunks(fileName, defaultSize)
  // const chunkDir = path.resolve(publicPath, fileName)
  // const fileList = await fs.readdir(chunkDir)
  // let start = 0
  // await Promise.all(
  //   fileList.map(name => {
  //     const rs = fs.createReadStream(path.resolve(chunkDir, name))
  //     rs.pipe(
  //       fs.createWriteStream(path.resolve(publicPath, fileName), { start })
  //     )
  //     start += defaultSize
  //   })
  // )
  res.json({ success: true })
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
