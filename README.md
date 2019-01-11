# Nuxt.js 全面配置(持续更新中)

### 其他系列

★ [vue-cli3 全面配置](https://github.com/staven630/vue-cli3-config)

<span id="top">目录</span>

- [√ 初始化项目](#init)
- [√ 环境变量配置](#env)
- [√ 打包分析](#analyze)
- [√ 提供全局 scss 变量](#scss)
- [√ 按需引入 emement-ui](#emementui)
- [√ 配置 hard-source-webpack-plugin](#hard)
- [√ 去除多余 css](#removecss)
- [√ Brotli 压缩](#brotli)

### <span id="init">☞ 初始化项目</span>

```
npx create-nuxt-app <项目名>
或
npx create-nuxt-app <项目名>
```

[▲ 回顶部](#top)

### <span id="env">☞ 环境变量配置</span>

&emsp;&emsp;可以配置在客户端和服务端共享的环境变量

```
module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

&emsp;&emsp;通过以下两种方式来使用 baseUrl 变量

1. 通过 process.env.baseUrl
2. 通过 context.baseUrl，请参考[context api](https://zh.nuxtjs.org/api/#%E4%B8%8A%E4%B8%8B%E6%96%87%E5%AF%B9%E8%B1%A1)

[▲ 回顶部](#top)

### <span id="analyze">☞ 打包分析</span>

&emsp;&emsp;package.json 中添加 analyze 命令

```
"analyze": "nuxt build --analyze"
```

&emsp;&emsp;修改 nuxt.config.js

```
export default {
  build: {
    analyza: {
      analyzeMode: 'static'
    }
  }
}
```

[▲ 回顶部](#top)

### <span id="scss">☞ 提供全局 scss 变量</span>

- 方法一：

```
npm i -S @nuxtjs/style-resources
npm i -D sass-loader node-sass
```

&emsp;&emsp;修改 nuxt.config.js

```
export default {
  modules: [
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: '~/assets/scss/variable.scss'
  }
}
```

- 方法二：

```
npm i -D nuxt-sass-resources-loader sass-loader node-sass
```

&emsp;&emsp;修改 nuxt.config.js

```
export default {
  modules: [
    ['nuxt-sass-resources-loader', ['~/assets/scss/variable.scss']]
  ],
  styleResources: {
    scss: '~/assets/scss/variable.scss'
  }
}
```

[▲ 回顶部](#top)

### <span id="emementui">☞ 按需引入 emement-ui</span>

```
npm i -D babel-plugin-component
// or
yarn add -D babel-plugin-component
```

&emsp;&emsp;修改 nuxt.config.js

```
module.exports = {
  plugins: ['@/plugins/element-ui'],
  build: {
    babel: {
      plugins: [
        [
          'component',
          { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' }
        ]
      ]
    }
  },
}
```

&emsp;&emsp;修改 plugins/element-ui.js

```
import Vue from 'vue'
import {
  Button, Loading, Notification, Message, MessageBox
} from 'element-ui'

import lang from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'

// configure language
locale.use(lang)

// set
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

// import components
Vue.use(Button);
// or
// Vue.component(Button.name, Button)
```

[▲ 回顶部](#top)

### <span id="hard">☞ 配置 hard-source-webpack-plugin</span>

```
npm i -D hard-source-webpack-plugin
```

&emsp;&emsp;修改 nuxt.config.js

```
module.exports = {
  build: {
    extractCSS: true,
    extend(config, ctx) {
      if (ctx.isDev) {
        config.plugins.push(
          new HardSourceWebpackPlugin({
            cacheDirectory: '.cache/hard-source/[confighash]'
          })
        )
      }
    }
  }
}
```

[▲ 回顶部](#top)

### <span id="removecss">☞ 去除多余 css</span>

```
npm i --D glob-all purgecss-webpack-plugin
```

&emsp;&emsp;若安装失败,请先用管理员身份安装以下全局依赖

```
npm install --global windows-build-tools
或
yarn global add windows-build-tools
```

&emsp;&emsp;修改 nuxt.config.js

```
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  build: {
    extractCSS: true,
    extend(config, ctx) {
      if (!ctx.isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            paths: glob.sync([
              resolve('./pages/**/*.vue'),
              resolve('./layouts/**/*.vue'),
              resolve('./components/**/*.vue')
            ]),
            extractors: [
              {
               extractor: class Extractor {
                  static extract(content) {
                    const validSection = content.replace(
                      /<style([\s\S]*?)<\/style>+/gim,
                      ""
                    );
                    return validSection.match(/[A-Za-z0-9-_:/]+/g) || [];
                  }
                },
                extensions: ['vue']
              }
            ],
            whitelist: ['html', 'body', 'nuxt-progress']
          })
        )
      }
    }
  }
}
```

[▲ 回顶部](#top)

### <span id="brotli">☞ Brotli 压缩</span>

```
npm i shrink-ray-current
```

&emsp;&emsp;若安装失败,请先用管理员身份安装以下全局依赖

```
npm install --global windows-build-tools
或
yarn global add windows-build-tools
```

&emsp;&emsp;修改 nuxt.config.js

```
export default {
  render: {
    http2: {
      push: true
    },
    compressor: shrinkRay()
  }
}
```

[▲ 回顶部](#top)
