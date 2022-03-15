import express, { Request, Response, NextFunction } from 'express'
import logger from 'morgan'
import { INTERNAL_SERVER_ERROR } from 'http-status-codes' // 500
import createError from 'http-errors'
import cors from 'cors'
import path from 'path'
import fs from 'fs-extra'
import multiparty from 'multiparty' // 处理上传文件的

const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'public')))

app.post('/upload', async (req, res, next) => {})

app.use((req, res, next) => {
  next(createError(404))
})
app.use((err, req, res, next) => {
  res.status(err.status || INTERNAL_SERVER_ERROR)
  res.json({
    success: false,
    err
  })
})

export default app
