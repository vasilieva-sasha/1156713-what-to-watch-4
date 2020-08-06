const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  entry: `./src/index.tsx`,
  resolve: {
    extensions: [`.ts`, `.tsx`, '.js', '.jsx', 'json'],
  },
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    historyApiFallback: true,
    open: true,
    hot: true,
    port: 1337,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.(tsx|ts)?$/,
        loader: `ts-loader`
      }
    ],
  },
  devtool: `source-map`,
  plugins: [
    new MomentLocalesPlugin()
  ],
};
