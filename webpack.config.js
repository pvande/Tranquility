const path = require('path')

const webpack = require('webpack')
const glob = require('webpack-glob-entries')
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const MultipageWebpackPlugin = require('multipage-webpack-plugin')

const transformValues = (obj, fn) => {
  const newObj = {}
  const keys = Object.getOwnPropertyNames(obj)

  for (let key of keys) {
    newObj[key] = fn(obj[key])
  }

  return newObj
}

module.exports = (env) => {
  const dashboards = glob('./dashboards/*.js')

  const config = {
    context: __dirname,
    entry: Object.assign(
      transformValues(dashboards, (file) => [file, path.join(__dirname, 'client.js')]),
      { vendor: [ 'react', 'react-dom' ] },
    ),
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'static'),
    },
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    },
    resolveLoader: {
      modules: [
        path.join(__dirname, 'node_modules'),
      ],
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: true
      }),
      new webpack.ProvidePlugin({
        React: 'react',
      }),
      new ChunkManifestPlugin({
        filename: 'manifest.json',
        inlineManifest: false,
      }),
      new MultipageWebpackPlugin({
        htmlTemplatePath: 'template.html',
        templateFilename: '[name].html',
        templatePath: '.',
      }),
    ],
    devtool: "module-source-map",
  }

  if (env == 'production') {
    config.output.filename = '[name]-[hash].js'
  }

  return config
}
