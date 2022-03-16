const fs = require('fs')
const pfs = fs.promises
const path = require('path')

const resolve = paths => path.resolve(__dirname, paths)

const tempDir = resolve('temp')
const assetsDir = resolve('public')

const defaultSize = 1024 * 50 // 100k
const splitChunks = async (filename, size = defaultSize) => {
  const tempFileDir = path.resolve(tempDir, filename)
  if (fs.existsSync(tempFileDir)) {
    await pfs.rm(tempFileDir, { recursive: true }) // 递归删除
  }
  await pfs.mkdir(tempFileDir) // 重新创建临时文件目录
  const rs = fs.createReadStream(resolve(filename), {
    highWaterMark: size
  })
  let i = 0
  rs.on('data', chunk => {
    const ws = fs.createWriteStream(
      path.resolve(tempFileDir, `${filename}-${i++}`)
    )
    ws.write(chunk)
  })
}
// splitChunks('test.png')

const mergeChunks = async (filename, size = defaultSize) => {
  const tempFileDir = path.resolve(tempDir, filename)
  const targetFilePath = path.resolve(assetsDir, filename)
  const files = await pfs.readdir(tempFileDir) // 读取文件夹 返回文件数组 [ 'test.png-0', 'test.png-1' ]
  files.sort((a, b) => Number(a.split('-')[1]) - Number(b.split('-')[1]))

  if (fs.existsSync(targetFilePath)) {
    await pfs.unlink(targetFilePath)
  }

  let start = 0
  await Promise.all(
    files.map(fileName => {
      return new Promise(resolve => {
        const sourceFilePath = path.resolve(tempFileDir, fileName)
        const rs = fs.createReadStream(sourceFilePath)
        rs.pipe(
          fs.createWriteStream(targetFilePath, {
            start
          })
        )
        start += size
        rs.on('end', async () => {
          await pfs.unlink(sourceFilePath)
          resolve()
        })
      })
    })
  )
  await pfs.rmdir(tempFileDir)
}

mergeChunks('test.png')
