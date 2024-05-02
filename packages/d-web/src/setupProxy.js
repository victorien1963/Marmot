const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/api', {
      target: process.env.REACT_SERVER_URL || 'http://127.0.0.1:7001',
      changeOrigin: true,
      ws: true,
      pathRewrite: { '^/api': '' },
    })
  )
  app.use(
    createProxyMiddleware('/chelonia', {
      target: process.env.CHELONIA_SERVER_URL || 'http://127.0.0.1:8000',
      changeOrigin: true,
      ws: true,
      pathRewrite: { '^/chelonia': '' },
    })
  )
  app.use(
    createProxyMiddleware('/socket', {
      target: process.env.REACT_SERVER_URL || 'http://127.0.0.1:7001',
      changeOrigin: true,
      ws: true,
      logLevel: 'debug',
    })
  )
}
