import { ChatGPTAPI } from 'chatgpt'

async function example() {
  const api = new ChatGPTAPI({
    apiKey: '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'
  })

  const res = await api.sendMessage('Hello World!')
  console.log(res.text)
}

example()
