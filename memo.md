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
- git diff --cachedでgit addした差分をみることができる

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

# 開発環境と本番環境の違いについて
|  mode         |  Dev  | Prod |
| ----          | ---- | --- |
|  圧縮          |  無  |  有  |
|  ビルド時間     |  小  |  大  |
|  パフォーマンス  | 悪   |  良  |

# webpack-dev-server
- npm i --save-dev webpack-dev-server
- npx webpack-dev-server --openでwatchモードにできる
- npm startにwebpac-dev-server --openを追加

# moduleのimport/exportいろいろ
```js
import { NAME, power } from './utilities'// jsファイルは拡張子を省略可能, 定数も可能
console.log(power(11))
console.log(NAME)

import * as utilities from './utilities'; // *で全部importが可能
console.log(utilities.power(11))
console.log(utilities.NAME)

import { NAME as NAME_OF_KIM, power } from './utilities'// {}内でもasが可能 => 名前衝突の回避
console.log(power(11))
console.log(NAME_OF_KIM)

import Linon from './utilities' // default export
console.log(Linon.say())

import Tiger from './utilities' // default exportは別名で問題ない
console.log(Tiger.say())
```


# style-loader, css-loaderの設定
- ./src/style.cssを追加
- configにmodule.rulesを追加
- useは逆から順番に適用されるので注意。
  - ["css-loader", "style-loader"]だとだめ。
  - ["style-loader", "css-loader"]ならOK
  - https://webpack.js.org/concepts/loaders/#loader-features => "A chain is executed in reverse order. "