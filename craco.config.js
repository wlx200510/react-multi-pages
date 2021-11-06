const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const CracoMultiplePage = require('./entry/multipagePlugin.ts')

const webpackPlugins = [
  // 查看打包的进度
  new SimpleProgressWebpackPlugin(),
]

// 多入口配置
function getCurEntry() {
  if (process.env.NODE_ENV === 'dev') {
    const entries = require('./entry/entry.json')
    if (!entries.entry || entries.entry.length === 0) {
      return getEntry('./src/pages/**/*.html')
    } else {
      var reg = entries.entry.reduce((total, item) => {
        if (total === '') {
          return item
        } else {
          return total + `|${item}`
        }
      }, '')
      return getEntry(`./src/pages/?(${reg})/*.html`)
    }
  } else {
    return getEntry('./src/pages/**/*.html')
  }
}

function getEntry(globPath) {
  let entries = []
  glob.sync(globPath).forEach(function (entry) {
    var basename = path.basename(entry, path.extname(entry))
    var temp = entry.replace(/\.html/, '.tsx')
    entries.push({
      entry: temp,
      template: entry,
      name: basename,
    })
  })
  return entries
}
// help doc: https://github.com/gsoft-inc/craco
module.exports = {
  plugins: [
    {
      plugin: CracoMultiplePage,
      options: {
        pages: getCurEntry(),
      },
    },
  ],
  // reactScriptsVersion: 'react-scripts' /* (default value) */,
  style: {
    // sass: {
    //   loaderOptions: {
    //     /* Any sass-loader configuration options: https://github.com/webpack-contrib/sass-loader. */
    //   },
    //   loaderOptions: (sassLoaderOptions, { env, paths }) => {
    //     return sassLoaderOptions
    //   },
    // },
    postcss: {
      mode: 'file',
      plugins: [],
      env: {
        autoprefixer: {
          /* Any autoprefixer options: https://github.com/postcss/autoprefixer#options */
        },
        stage: 3 /* Any valid stages: https://cssdb.org/#staging-process. */,
        features: {
          /* Any CSS features: https://preset-env.cssdb.org/features. */
        },
      },
    },
  },
  babel: {
    presets: [],
    plugins: [['import', { libraryName: 'antd-mobile', style: 'css' }]],
    loaderOptions: {
      /* Any babel-loader configuration options: https://github.com/babel/babel-loader. */
    },
    // loaderOptions: (babelLoaderOptions) => {
    //   return babelLoaderOptions
    // },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    devtool:
      process.env.REACT_APP_ENV === 'prod' ? 'eval-source-map' : 'souurce-map',
    plugins: {
      add: webpackPlugins /* An array of plugins */,
      remove:
        [] /* An array of plugin constructor's names (i.e. "StyleLintPlugin", "ESLintWebpackPlugin" ) */,
    },
    // configure: {
    //   /* Any webpack configuration options: https://webpack.js.org/configuration */
    // },
  },
  devServer: {
    /* Any devServer configuration options: https://webpack.js.org/configuration/dev-server/#devserver. */
    host: 'localhost',
    port: 3000,
    disableHostCheck: true,
    https: true,
  },
}
