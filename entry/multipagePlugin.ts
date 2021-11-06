'use strict'
const {
  removePlugins,
  addPlugins,
  pluginByName,
  whenDev,
} = require('@craco/craco')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  overrideWebpackConfig: ({
    webpackConfig,
    pluginOptions,
    context: { paths },
  }) => {
    removePlugins(webpackConfig, pluginByName('HtmlWebpackPlugin'))
    removePlugins(webpackConfig, pluginByName('ManifestPlugin'))
    const pages = pluginOptions.pages || []
    const plugins = []
    const entry = {}
    pages.forEach((page) => {
      const isIndex = page.name === 'index'
      entry[page.name] = [
        isDevelopment &&
          require.resolve('react-dev-utils/webpackHotDevClient') &&
          path.resolve(page.entry),
        !isDevelopment && path.resolve(page.entry),
      ].filter(Boolean)
      if (isIndex) {
        paths.appIndexJs = page.entry
        paths.appHtml = page.template
      }
      plugins.push(
        new HtmlWebpackPlugin({
          title: page.title || 'Custom template',
          template: page.template,
          filename: `${page.name}.html`,
          chunks: [page.name],
        })
      )
    })
    webpackConfig.entry = entry
    addPlugins(webpackConfig, plugins)
    whenDev(() => {
      webpackConfig.output.filename = 'static/js/[name].bundle.js'
    })
    return webpackConfig
  },
}
