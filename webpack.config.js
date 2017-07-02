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

const BASE_CSS = path.join(__dirname, 'baseline.css')
const CLIENT_JS = path.join(__dirname, 'client.js')
const addCommonDependencies = (f) => [ f, `!!style-loader!css-loader!${BASE_CSS}`, CLIENT_JS ]

module.exports = (env) => {
  const dashboards = glob('./dashboards/*.js')

  const config = {
    context: __dirname,
    entry: Object.assign(
      transformValues(dashboards, addCommonDependencies),
      { vendor: [ 'react', 'react-dom' ] }
    ),
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'static'),
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
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
        path.join(__dirname, 'components'),
        path.join(__dirname, 'node_modules'),
      ],
    },
    plugins: [
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
