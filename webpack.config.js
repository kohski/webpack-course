const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // uglifyjs-webpack-pluginはuglify-jsに依存。uglify-jsの設定をみる

const outpuPath = path.resolve(__dirname, "dist");
console.log({ outpuPath: outpuPath });

// module = fileと捉えてOK
module.exports = {
  entry: "./src/index.js", // module bundleの対象
  output: {
    path: outpuPath,
    filename: "main.js",
  },
  devServer: {
    contentBase: outpuPath,
  },
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/, // cssまたはscssに適用
        // https://webpack.js.org/concepts/loaders/#loader-features
        // 'A chain is executed in reverse order. '
        use: [
          MiniCssExtractPlugin.loader, // header>linkでstyleシートを読込み
          // "style-loader", // head > styleを読込み
          "css-loader",
          "sass-loader", // sassでcssにコンパイル => cssをjsにコンパイル => styleタグに読み込まれる
        ],
      },
      // {
      //   test: /\.png|jpe?g|gif|svg|ico|pdf$/i, //jpeg or jpg対応で?を追加。 ケースセンシティブじゃなくていいからiオプションを追加
      //   use: "url-loader", // optionsを利用しない場合、base64エンコーディングされる
      // },
      {
        test: /\.png|jpe?g|gif|svg|ico|pdf$/i, //jpeg or jpg対応で?を追加。 ケースセンシティブじゃなくていいからiオプションを追加
        // use: "url-loader", // optionsを利用しない場合、base64エンコーディングされる
        loader: "url-loader",
        options: {
          limit: 2048, // 1byte単位 => 2048 = 2KBって意味。
          name: "./images/[name].[ext]",
        },
      },
      {
        test: /\.jsx?$/,  // https://babeljs.io/setup#installationより抜粋
        exclude: /node_modules/, // node_modulesはbabelでどうこうしない。
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css' // cssがcacheされることを回避する。毎回ハッシュがfilenameに挿入されるので。
    })
  ],
  optimization: { // 最適化 ... webpack4からの機能
    minimizer: [
      new UglifyJsPlugin({  // https://github.com/mishoo/UglifyJS ここで確認が可能
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }
};
