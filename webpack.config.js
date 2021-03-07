const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin')

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
        test: /\.css$/,
        // https://webpack.js.org/concepts/loaders/#loader-features
        // 'A chain is executed in reverse order. '
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        // https://webpack.js.org/concepts/loaders/#loader-features
        // 'A chain is executed in reverse order. '
        use: [
          "style-loader",
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
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};
