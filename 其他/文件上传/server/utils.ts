import path from 'path'
import fs from 'fs-extra'

const DEFAULT_SIZE = 1024 * 1024 * 1 // 每 1M 切一片
const TEMP_DIR = path.resolve(__dirname, 'temp') // 临时文件存放目录
const PUBLIC_DIR = path.resolve(__dirname, 'public') // 临时文件存放目录

export const splitChunks = async (
  filename: string,
  size: number = DEFAULT_SIZE
) => {
  const filePath = path.resolve(__dirname, filename) // 需要分割的绝对路径
  const chunkDir = path.resolve(TEMP_DIR, filename) // 以文件名命名的临时目录 用于存放分割后的文件
  await fs.mkdirp(chunkDir) // 创建文件

  const rs = fs.createReadStream(filePath, {
    highWaterMark: size
  })
  let i = 0
  rs.on('data', function (chunk) {
    const ws = fs.createWriteStream(
      path.resolve(chunkDir, filename + '-' + i++)
    )
    ws.write(chunk)
  })
  rs.resume()
}
// splitChunks('test.jpg')

/* 
1.读取所有指定临时目录下文件的所有文件 按尾部索引号排序
2.将它们累加在一起 一旦加过了直接删除
3.为了提高性能 尽量用流来实现 不要用 readFile wiiteFile
*/
export const mergeChunks = async (
  filename: string,
  size: number = DEFAULT_SIZE
) => {
  const filePath = path.resolve(PUBLIC_DIR, filename) // 目标文件路径
  const chunkDir = path.resolve(TEMP_DIR, filename) // 临时文件目录
  const chunkFiles = await fs.readdir(chunkDir)
  chunkFiles.sort((a, b) => Number(a.split('-')[1]) - Number(b.split('-')[1]))

  let start = 0
  await Promise.all(
    chunkFiles.map(name => {
      return new Promise(r => {
        const rs = fs.createReadStream(path.resolve(chunkDir, name))
        rs.pipe(
          fs.createWriteStream(filePath, {
            start
          })
        )
        start += size
        rs.on('end', async () => {
          await fs.unlink(path.resolve(chunkDir, name))
          r(null)
        })
      })
    })
  )
  await fs.rmdirSync(chunkDir, { recursive: true }) // 移除临时目录
}

// mergeChunks('test.jpg')

/* 
export const splitChunks = async (
  filename: string,
  size: number = DEFAULT_SIZE
) => {
  const filePath = path.resolve(__dirname, filename) // 需要分割的绝对路径
  const chunkDir = path.resolve(TEMP_DIR, filename) // 以文件名命名的临时目录 用于存放分割后的文件
  await fs.mkdirp(chunkDir) // 创建文件

  let content = await fs.readFile(filePath) // buffer 字节数组
  const len = content.length
  let i = 0,
    current = 0
  while (current < len) {
    await fs.writeFile(
      path.resolve(chunkDir, filename + '-' + i),
      content.slice(current, current + size)
    )

    i++
    current += size
  }
}
*/
