devServer: {
  port: 8080,
  proxy: {
    '^/sweet': {
      target: 'https://api.lovelive.tools/',
      changeOrigin: true,
      pathRewrite: {
        '^/sweet': ''
      }
    },
  }
},