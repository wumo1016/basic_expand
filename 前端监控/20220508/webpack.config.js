const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  context: process.cwd(),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    port: 3000,
    static: path.resolve(__dirname, 'dist'), // 静态文件根目录
    onBeforeSetupMiddleware({ app }) {
      app.get('/success', function (req, res) {
        res.json({ i: 1 })
      })
      app.post('/error', function (req, res) {
        res.setStatus(500)
      })
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
