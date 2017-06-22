const path = require('path')

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

  const config = {
    context: __dirname,
    entry: transformValues(glob('./dashboards/*.js'), (file) => [file, './client.js']),
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'static'),
    },
    plugins: [
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
  }

  if (env == 'production') {
    config.output.filename = '[name]-[hash].js'
  }

  return config
}
