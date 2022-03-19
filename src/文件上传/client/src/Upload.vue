<template>
  <a-row>
    <a-col :span="6">
      <a-input type="file" @change="handleChange" />
      <a-button style="margin-top: 10px" type="primary" @click="handleUpload">
        上传
      </a-button>

      <h2>{{ hashPercent }}%</h2>
    </a-col>
    <a-col :span="16" :offset="2"> <img :src="imgUrl" alt="" /></a-col>
  </a-row>
</template>

<script setup>
import { onUnmounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { allowFile, createChunks, request } from './utils'

const currentFile = ref(null)
const imgUrl = ref(null)
const hashPercent = ref(0)

const handleChange = e => {
  const file = e.target.files[0]
  currentFile.value = file
  // imgUrl.value = URL.createObjectURL(file)
  const reader = new FileReader()
  reader.addEventListener('load', () => {
    imgUrl.value = reader.result
  })
  reader.readAsDataURL(file)
}

// 计算hash值
const calculateHash = partList => {
  return new Promise(resolve => {
    const worker = new Worker('/hash.js')
    worker.postMessage({ partList })
    worker.onmessage = e => {
      const { percent, hash } = e.data
      hashPercent.value = percent
      if (hash) {
        resolve(hash)
      }
    }
  })
}

const handleUpload = async () => {
  if (!currentFile.value) {
    return message.error('你尚未选择文件')
  }
  if (!allowFile(currentFile.value)) return
  // 分片
  const partList = createChunks(currentFile.value)
  // 计算哈希值 用于做秒传的功能 通过webWorker子进程去计算哈希
  // 因为同一个文件分片的结果一样 hash也就一样 将来如果在服务器找到了同样的hash 就直接跳过
  const fileHash = await calculateHash(partList)
  const name = currentFile.value.name
  const extName = name.slice(name.lastIndexOf('.'))
  const fileName = `${fileHash}${extName}`
  partList.forEach((item, index) => {
    item.fileName = fileName
    item.chunkName = `${fileName}-${index}`
  })
  // 分片上传
  await Promise.all(
    partList.map(part =>
      request({
        url: `/upload/${part.fileName}/${part.chunkName}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        data: part.chunk
      })
    )
  )
  // 合并
  await request({
    url: `/merge/${fileName}`,
    method: 'POST'
  })
  message.info('上传成功')
}

// onUnmounted(() => URL.revokeObjectURL(imgUrl.value))
</script>

<style lang="scss">
img {
  width: 80%;
  height: auto;
}
</style>

<!-- 
const handleUpload = async () => {
  if (!currentFile.value) {
    return message.error('你尚未选择文件')
  }
  if (!allowFile(currentFile.value)) return
  const formData = new FormData()
  formData.append('chunk', currentFile.value)
  formData.append('filename', currentFile.value.name)

  console.log(formData)
  const res = await request({
    url: '/upload',
    method: 'POST',
    data: formData
  })
  console.log(res)

  message.info('上传成功')
}
 -->
