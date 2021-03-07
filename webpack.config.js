const path = require('path')

const outpuPath = path.resolve(__dirname, 'dist')
console.log({outpuPath: outpuPath})

// module = fileと捉えてOK
module.exports = {
  entry: './src/index.js', // module bundleの対象
  output: {
    path: outpuPath,
    filename: 'main.js'
  }
}