const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => ({
  mode: argv.mode || 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/[name].[contenthash:8].js',
    chunkFilename: 'assets/[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'assets/[name].[contenthash:8][ext]',
    clean: true,
    publicPath: 'auto',
  },
  resolve: { extensions: ['.js', '.jsx'] },
  module: { rules: [
    { test: /\.(png|jpe?g|gif|svg|webp)$/i, type: 'asset/resource' },
    { test: /\.(woff2?|eot|ttf|otf)$/i, type: 'asset/resource' },
    { test: /\.(pdf|bin|wasm)$/i, type: 'asset/resource' },
    { test: /\.(js|jsx)$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env', '@babel/preset-react'] } } },
    { test: /\.css$/, use: ['style-loader', 'css-loader'] },
  ] },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html', favicon: './src/assets/labelmatrix-logo.png', minify: argv.mode === 'production' })],
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: { chunks: 'all', maxInitialRequests: 8, cacheGroups: { vendor: { test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'async', priority: -10 }, common: { minChunks: 2, name: 'common', priority: -20, reuseExistingChunk: true } } },
  },
  cache: { type: 'filesystem', buildDependencies: { config: [__filename] } },
  devtool: argv.mode === 'production' ? 'source-map' : 'eval-cheap-module-source-map',
  devServer: { port: 3000, historyApiFallback: true, hot: true, compress: true, client: { overlay: true } },
  performance: { hints: argv.mode === 'production' ? 'warning' : false, maxAssetSize: 600000, maxEntrypointSize: 700000 },
});
