/* eslint-disable no-restricted-syntax */
const OpenAI = require('openai')

const openai = new OpenAI()

const getImage = async (prompt = "a white siamese cat", n = 1, size = "512x512") => {
  const response = await openai.images.generate({
    prompt: prompt,
    n,
    size,
  })
  return response.data.map((d) => d.url)
}

const getChatResponse = async (history = [], streamFunc, replyFunc, max_tokens = 200, n = 1, model = 'gpt-3.5-turbo') => {  
  const chatCompletion = await openai.chat.completions.create({
    model,
    messages: [{ role: 'user', content: '回答中請勿包含任何簡體中文字' },].concat(history),
    stream: true,
    max_tokens,
    temperature: 0,
    n,
  })

  const composed = []
  const composedWithIndex = Array.from({ length: n }).map(() => [])
  for await (const message of chatCompletion) {
    if (message.choices && message.choices[0].finish_reason) {
      replyFunc(composed.join('').replaceAll('\\n', '').replaceAll('\n', ''))
    }
    if (message.choices && message.choices[0]) {
      streamFunc(message.choices[0].delta.content)
      composed.push(message.choices[0].delta.content)
      if (message.choices[0].index !== undefined) {
        composedWithIndex[message.choices[0].index].push(message.choices[0].delta.content || '')
      }
    }
  }
  return n !== 1 ? composedWithIndex.map((c) => c.join('').replaceAll('\\n', '').replaceAll('\n', '')) : composed.join('').replaceAll('\\n', '').replaceAll('\n', '')
}

const getStreamResponse = async (message = '', streamFunc, replyFunc, option = {}) => {
  const {
    model = 'text-davinci-003', style = 'AI智能機器人', wordLimit = 30, max_tokens = 2000, nodefault = false
  } = option
  const prompt = nodefault ? message : `請以${style}的風格回答以下句子：${message}，回答長度最多為${wordLimit}字。`

  const composed = []
  try {
    const completion = await openai.completions.create({
      model,
      prompt,
      max_tokens,
      stream: true
    }, { timeout: 120000, responseType: 'stream' })

    for await (const message of completion) {
      if (message.choices && message.choices[0].finish_reason === 'stop') {
        replyFunc(composed.join('').replaceAll('\\n', '').replaceAll('\n', ''))
      }
      if (message.choices && message.choices[0].text) {
        streamFunc(message.choices[0].text)
        composed.push(message.choices[0].text)
      }
    }
    return composed.join('').replaceAll('\\n', '').replaceAll('\n', '')
  } catch (error) {
    if (error.response?.status) {
      console.error(error.response.status, error.message)
      error.response.data.on('data', (data) => {
        const message = data.toString()
        try {
          const parsed = JSON.parse(message)
          console.error('An error occurred during OpenAI request: ', parsed)
        } catch (e) {
          console.error('An error occurred during OpenAI request: ', message)
        }
      })
    } else {
      console.error('An error occurred during OpenAI request', error)
    }
    return 'ᕕ( ᐛ )ᕗ'
  }
}

module.exports = {
  getImage,
  getChatResponse,
  getStreamResponse
}
