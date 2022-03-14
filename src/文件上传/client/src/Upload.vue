<template>
  <a-row>
    <a-col :span="6">
      <a-input type="file" @change="handleChange" />
      <a-button style="margin-top: 10px" type="primary" @click="handleUpload">
        上传
      </a-button>
    </a-col>
    <a-col :span="16" :offset="2"> <img :src="imgUrl" alt="" /></a-col>
  </a-row>
</template>

<script setup>
import { onUnmounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { request } from './utils'

const currentFile = ref(null)
const imgUrl = ref(null)

const handleChange = e => {
  const file = e.target.files[0]
  currentFile.value = file
  /* // 方法1
  imgUrl.value = URL.createObjectURL(file) */

  const reader = new FileReader()
  reader.addEventListener('load', () => {
    imgUrl.value = reader.result
  })
  reader.readAsDataURL(file)
}

const allowFile = file => {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/p4']
  if (!validFileTypes.includes(file.type)) {
    message.error(`不支持${file.type}格式的文件上传`)
    return false
  }
  const size = file.size / 1024 / 1024 // m
  if (size > 1024 * 2) {
    message.error(`上传的文件不能大于2G`)
    return false
  }
  return true
}

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

onUnmounted(() => URL.revokeObjectURL(url.value))
</script>

<style lang="scss">
img {
  width: 80%;
  height: auto;
}
</style>
