<template>
  <a-row>
    <a-col :span="14">
      <a-input type="file" @change="handleChange" />
      <a-button
        :disabled="uploadStatus !== 'init'"
        style="margin: 10px 5px"
        type="primary"
        @click="handleUpload"
      >
        上传
      </a-button>
      <a-button
        style="margin: 10px 5px"
        type="primary"
        :disabled="uploadStatus !== 'loading'"
        @click="handlePause"
      >
        暂停
      </a-button>
      <a-button
        style="margin: 10px 5px"
        type="primary"
        :disabled="uploadStatus !== 'pause'"
        @click="handleResume"
      >
        继续
      </a-button>
      <h2>hash进度：<a-progress :percent="hashPercent"></a-progress></h2>
      <h2>上传总进度：<a-progress :percent="totalPercent"></a-progress></h2>
      <div>
        <a-table :columns="columns" :dataSource="tableData" rowKey="chunkName">
          <template #percent="{ record }">
            <a-progress :percent="record.percent"></a-progress>
          </template>
        </a-table>
      </div>
    </a-col>
    <a-col :span="8" :offset="2"> <img :src="imgUrl" alt="" /></a-col>
  </a-row>
</template>

<script setup>
import { computed, onUnmounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { allowFile, createChunks, request } from './utils'

const currentFile = ref(null)
const fileName = ref('')
const imgUrl = ref(null)
const hashPercent = ref(0)
const tableData = ref([])
const uploadStatus = ref('init')

const reset = () => {
  uploadStatus.value = 'init'
  hashPercent.value = 0
  tableData.value = []
  currentFile.value = null
  fileName.value = ''
}

const columns = [
  {
    title: '切片名称',
    dataIndex: 'chunkName',
    key: 'chunkName',
    width: '50%'
  },
  {
    title: '进度',
    key: 'percent',
    width: '50%',
    dataIndex: 'percent',
    slots: { customRender: 'percent' }
  }
]

const totalPercent = computed(() => {
  return tableData.value.length > 0
    ? (
        tableData.value.reduce((total, cur) => Number(cur.percent) + total, 0) /
        tableData.value.length
      ).toFixed(2)
    : 0
})

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

const uploadParts = async () => {
  // 验证是否上传
  const { needUpload, uploadList } = await request({
    url: `/verify/${fileName.value}`,
    method: 'GET'
  })
  if (!needUpload) {
    tableData.value.forEach(part => {
      part.loaded = part.size
      part.percent = 100
    })
    reset()
    return message.success('秒传功能')
  }
  // 分片上传
  await Promise.all(
    tableData.value
      .filter(part => {
        const uploadFile = uploadList.find(v => v.chunkName === part.chunkName)
        if (!uploadFile) return true
        if (uploadFile.size < part.size) {
          part.loaded = uploadFile.size
          part.percent = ((uploadFile.size / part.size) * 100).toFixed(2)
          return true
        }
        return false
      })
      .map(part =>
        request({
          url: `/upload/${part.fileName}/${part.chunkName}/${part.loaded}`,
          method: 'POST',
          headers: { 'Content-Type': 'application/octet-stream' },
          data: part.chunk.slice(part.loaded),
          setXhr: xhr => (part.xhr = xhr),
          onProgress: e => {
            part.percent = (
              ((part.loaded + e.loaded) / part.chunk.size) *
              100
            ).toFixed(2)
          }
        })
      )
  )
  // 合并
  await request({
    url: `/merge/${fileName.value}`,
    method: 'POST'
  })

  reset()
  message.info('上传成功')
}

const handleUpload = async () => {
  if (!currentFile.value) {
    return message.error('你尚未选择文件')
  }
  if (!allowFile(currentFile.value)) return
  uploadStatus.value = 'loading'
  // 分片
  const partList = createChunks(currentFile.value)
  // 计算哈希值 用于做秒传的功能 通过webWorker子进程去计算哈希
  // 因为同一个文件分片的结果一样 hash也就一样 将来如果在服务器找到了同样的hash 就直接跳过
  const fileHash = await calculateHash(partList)
  const name = currentFile.value.name
  const extName = name.slice(name.lastIndexOf('.'))
  fileName.value = `${fileHash}${extName}`
  partList.forEach((item, index) => {
    item.fileName = fileName.value
    item.chunkName = `${fileName.value}-${index}`
    item.loaded = 0
    item.percent = 0
  })

  tableData.value = partList

  await uploadParts()
}

// 暂停
const handlePause = () => {
  uploadStatus.value = 'pause'
  tableData.value.forEach(part => part?.xhr?.abort())
}

// 继续上传
const handleResume = async () => {
  uploadStatus.value = 'loading'
  await uploadParts()
}
// onUnmounted(() => URL.revokeObjectURL(imgUrl.value))
</script>

<style lang="scss">
img {
  width: 99%;
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
