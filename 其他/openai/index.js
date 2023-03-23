// const { Configuration, OpenAIApi } = require('openai')

// const configuration = new Configuration({
//   apiKey: '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'
// })
// const openai = new OpenAIApi(configuration)

// openai
//   .createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     messages: [{ role: 'user', content: 'Hello world' }]
//   })
//   .then(res => {
//     console.log(res.data.choices[0].message)
//   })

const Koa = require('koa')
const path = require('path')
const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: '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',
  organization: 'org-XRzanQbzPJhs1hWThPGH1Nek'
})
const openai = new OpenAIApi(configuration)

const bodyParse = require('koa-bodyparser')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

app.use(bodyParse())

app.use(router.routes())

router.get('/test', async (ctx, next) => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Hello world' }]
  })
  console.log(completion);
  ctx.body = completion.data.choices[0].message
  // console.log(completion.data.choices[0].message)
  // ctx.body = '你好啊sedzs'
})

app.listen(3000, () => {
  console.log('sever start')
})
