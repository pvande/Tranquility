const path = require('path')

const webpack = require('webpack')
const glob = require('webpack-glob-entries')
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const mapValues = (obj, fn) => {
  const newObj = {}
  const keys = Object.getOwnPropertyNames(obj)

  for (let key of keys) {
    newObj[key] = fn(obj[key])
  }

  return newObj
}

module.exports = env => {
  const dashboards = glob('/user/dashboards/*.js')
  const dashboardNames = Object.keys(dashboards)

  const htmlGeneratingPlugins = dashboardNames.map(
    name =>
      new HtmlWebpackPlugin({
        filename: `${name}.html`,
        chunksSortMode: 'dependency',
        chunks: ['client', 'vendor', 'shared', name],
        template: 'template.html',
      }),
  )

  const config = {
    context: __dirname,
    entry: Object.assign({}, dashboards, {
      vendor: ['react', 'react-dom'],
      client: [
        '!!style-loader!css-loader!/app/client/baseline.css',
        '/app/client/client.js',
      ],
    }),
    output: {
      filename: '[name].js',
      path: '/app/static',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  require('babel-preset-modern-browsers').buildPreset,
                  { modules: false },
                ],
                [require('babel-preset-react')],
              ],
              plugins: [require('babel-plugin-transform-runtime')],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        '/user/components',
        '/app/client/built-ins',
        '/app/node_modules',
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({ React: 'react' }),
      new ChunkManifestPlugin({
        filename: 'manifest.json',
        inlineManifest: false,
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'shared',
        minChunks: dashboardNames.length,
        chunks: dashboardNames,
      }),

      ...htmlGeneratingPlugins,

      new CompressionPlugin({
        asset: '[path].gz[query]',
        test: /\.js(\.map)?$/,
        threshold: 5120,
        deleteOriginalAssets: true,
      }),
    ],
    devtool: 'module-source-map',
  }

  if (env == 'production') {
    config.output.filename = '[name]-[hash].js'
  }

  return config
}
