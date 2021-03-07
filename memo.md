# npm packageのインストール

```bash
$ npm info <package_name> # versionがわかる
$ npm i --save-dev live-server@1.2.1 webpack@4.29.0 webpack-cli@3.2.1
```

# その他
- npx
  - node_moduleをモジュール実行するためのコマンド
  - これがない場合は不便。パッケージのbinの場所をいちいち調べなきゃなので不便
    ```bash
    $ ./node_modules/.bin/live-server
    ```
  npm 5.2.0以降の機能

# まずはcdnでscriptタグでinstall

# つぎにwebpackの導入
- dist/を作成
- mv dist/index.html
- npm i lodash
- src/index.js内でimport _ from 'lodash'
- index.htmlのscriptタグのsrcを変更
- npx webpack

# weback.config.jsを作成
- 以下を指定
  - entry
  - output
```js
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
```
- コマンドは以下
```bash
$ npx webpack --mode development --config webpack.config.js
```