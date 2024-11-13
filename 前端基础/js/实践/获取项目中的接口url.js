import fs, { readFileSync } from 'fs'
import path from 'path'

const basePath = path.resolve(__dirname, './src/api')

function readDir(dirPath) {
  const paths = fs.readdirSync(dirPath)
  for (const _path of paths) {
    try {
      const abPath = path.join(dirPath, _path)
      const stats = fs.statSync(abPath)
      if (stats.isFile()) {
        readFile(abPath)
      } else if (stats.isDirectory()) {
        readDir(abPath)
      }
    } catch (error) {}
  }
}

const pathSet = new Set()
const res = {}
const empty = []
const repeat = {}

async function readFile(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  if (!filePath.includes('d.ts') && !filePath.includes('type.ts')) {
    const data = content.match(/['`"]\/(.+?)['`"?]/g)
    const fPath = filePath.replaceAll('\\', '/').slice(24)
    if (data) {
      res[fPath] = data.map(str => {
        const api = str.slice(1, -1)
        if (pathSet.has(api)) {
          ;(repeat[fPath] ||= []).push(api)
        } else {
          pathSet.add(api)
        }
        return api
      })
    } else {
      empty.push(fPath)
    }
  }
}

// readDir(basePath)

// fs.writeFileSync(
//   path.resolve(__dirname, './res.js'),
//   `const empty = ${JSON.stringify(empty)}; const repeat = ${JSON.stringify(repeat)};`
// )

// const str = 'const url = `/Api/Experiment/GetRelationData`'
// const str = "const url = '/Api/Experiment/GetRelationData'"
// const str = 'const url = "/Api/Experiment/GetRelationData"'
// const str = 'const url = "/Api/Experiment/GetRelationData?a=123"'

// console.log(str.match(/['`"]\/(.+?)['`"?]/g))

const list = []

function readDir1() {
  const basePath = path.resolve(__dirname, './src/api/modules')
  const paths = fs.readdirSync(basePath)
  for (const _path of paths) {
    list.push(path.join(basePath, _path).replaceAll('\\', '/').slice(24))
  }
}

readDir1()

fs.writeFileSync(path.resolve(__dirname, './res1.js'), `const res = ${JSON.stringify(list)};`)
