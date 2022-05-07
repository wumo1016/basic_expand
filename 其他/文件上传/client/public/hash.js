self.importScripts('https://cdn.bootcss.com/spark-md5/3.0.0/spark-md5.js')
self.onmessage = async e => {
  const { partList } = e.data
  const spark = new self.SparkMD5.ArrayBuffer()
  let percent = 0 // 当前进度
  let perPercent = 100 / partList.length
  const buffers = await Promise.all(
    partList.map(({ chunk, size }) =>
      // 方法1
      // new Promise(resolve => {
      //   const reader = new FileReader()
      //   reader.readAsArrayBuffer(chunk)
      //   reader.onload = ev => {
      //     percent += perPercent
      //     self.postMessage({ percent: Number(percent.toFixed(2)) })
      //     resolve(ev.target.result)
      //   }
      // })

      // 方法2
      chunk.arrayBuffer().then(buffer => {
        percent += perPercent
        self.postMessage({ percent: Number(percent.toFixed(2)) })
        return buffer
      })
    )
  )
  buffers.forEach(buffer => spark.append(buffer))
  self.postMessage({ percent: 100, hash: spark.end() })
  self.close()
}
