import express, { Request, Response, NextFunction } from 'express'
import logger from 'morgan'
import { INTERNAL_SERVER_ERROR } from 'http-status-codes' // 500
import createError from 'http-errors'
import cors from 'cors'
import path from 'path'
import fs from 'fs-extra'
import multiparty from 'multiparty' // 处理上传文件的

const publicPath = path.resolve(__dirname, 'public')

const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'public')))

app.post('/upload', async (req, res, next) => {
  const form = new multiparty.Form()
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(err)
    }
    console.log(fields)
    console.log(files)
    const filename = fields.filename[0]
    const chunk = files.chunk[0]

    await fs.move(chunk.path, path.resolve(publicPath, filename), {
      overwrite: true
    })

    res.json({ success: true })
  })
})

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
