# create-react-app 相关配置

cra是react官方在v18前的默认脚手架，18以后react官方主推 next.js 为代表的SSR框架，
桌面应用这种富客户端软件不适合服务端渲染，所以还是采用cra
cra配置路径在 "根目录/craco.config.js"

## cra相关配置说明

cra的配置完全兼容webpack

```js
const path = require("path")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const TerserPlugin = require("terser-webpack-plugin")

const { whenProd } = require("@craco/craco")

module.exports = {
	devServer: {
		port: 1718,   // 开发服务器端口号
		open: false   // 不自动打开浏览器
	},
	webpack: {
		alias: {
			'@': path.resolve('src'),  // 设置别名 '@' 指向 'src' 目录
			'@statics': path.resolve(__dirname, 'src/renderer/statics'),  // '@statics' 指向静态资源目录
			'@views': path.resolve(__dirname, 'src/renderer/views'),  // '@views' 指向视图目录
			'@comp': path.resolve(__dirname, 'src/renderer/components'),  // '@comp' 指向组件目录
			'@services': path.resolve(__dirname, 'src/renderer/services'),  // '@services' 指向服务目录
			'@api': path.resolve(__dirname, 'src/renderer/api'),  // '@api' 指向API目录
			'@utils': path.resolve(__dirname, 'src/renderer/utils'),  // '@utils' 指向工具函数目录
			'@redux': path.resolve(__dirname, 'src/renderer/redux'),  // '@redux' 指向Redux相关目录
			'@styles': path.resolve(__dirname, 'src/renderer/styles'),  // '@styles' 指向样式目录
			'@configs': path.resolve(__dirname, 'src/renderer/configs'),  // '@configs' 指向配置文件目录
		},
		publicPath: "/",  // 静态资源的公共路径
		plugins: [
			...whenProd(() => [
				// 打包时生成压缩包（可以通过解开注释启用）
				// new BundleAnalyzerPlugin()
			], [])
		],
		configure: (webpackConfig, { env: webpackEnv, paths }) => {
			webpackConfig.devtool = process.env.NODE_ENV === "development" ? "source-map" : false;  // 开发环境启用source map，生产环境关闭
			webpackConfig.entry = path.resolve(__dirname, 'src', 'renderer/entry/index.js')  // 设置入口文件路径
			webpackConfig.resolve.fallback = {
				"path": false  // 兼容Node.js的path模块API
			};
			webpackConfig.ignoreWarnings = [/Failed to parse source map/]  // 忽略source map解析失败的警告
			webpackConfig.module.rules.push({
				test: /\.(js|mjs|jsx|svg)$/,  // 匹配JavaScript和SVG文件
				enforce: "pre",  // 预处理这些文件
				loader: require.resolve("source-map-loader"),  // 使用source-map-loader加载器
				resolve: {
					fullySpecified: false  // 禁用完全指定模块路径
				}
			})
			whenProd(() => {
				webpackConfig.optimization.minimize = true  // 启用代码压缩
				webpackConfig.optimization.minimizer.map(plugin => {
					if (plugin instanceof TerserPlugin) {
						// 自定义TerserPlugin配置，删除调试信息和console.log
						Object.assign(plugin.options.minimizer.options.compress, {
							drop_debugger: true,  // 删除debugger语句
							drop_console: true,  // 删除所有console语句
							pure_funcs: ["console.log"]  // 删除console.log
						})
					}
					return plugin
				})
				webpackConfig.optimization.runtimeChunk = "single"  // 将运行时代码提取为单个chunk
				webpackConfig.optimization.splitChunks = {
					...webpackConfig.optimization.splitChunks,
					chunks: "all",  // 分割所有的chunk
					minSize: 30000,  // 最小尺寸，超过该尺寸的chunk会被分割
					maxAsyncRequests: 30,  // 最大异步请求数
					maxInitialRequests: 30,  // 最大初始请求数
					cacheGroups: {
						defaultVendors: {
							test: /[\\/]node_modules[\\/]/,  // 分割node_modules中的代码
							name: "vendors"  // 输出文件名为vendors
						},
						antd: {
							test: /antd/,  // 单独分割antd库
							name: "antd",
							priority: 90  // 优先级设为90
						},
						echarts: {
							test: /echarts/,  // 单独分割echarts库
							name: "echarts",
							priority: 90  // 优先级设为90
						},
						zrender: {
							test: /zrender/,  // 单独分割zrender库
							name: "zrender",
							priority: 90  // 优先级设为90
						},
						wangeditor: {
							test: /@wangeditor/,  // 单独分割wangeditor库
							name: "@wangeditor",
							priority: 90  // 优先级设为90
						},
						lodash: {
							test: /lodash/,  // 单独分割lodash库
							name: "lodash",
							priority: 90  // 优先级设为90
						},
						moment: {
							test: /moment/,  // 单独分割moment库
							name: "moment",
							priority: 90  // 优先级设为90
						},
						base: {
							chunks: "all",  // 分割基础框架
							test: /(react|react-dom|react-dom-router)/,  // 匹配react相关库
							name: "base",  // 输出文件名为base
							priority: 100  // 优先级设为100
						},
						commons: {
							chunks: "all",  // 分割公共模块
							minChunks: 2,  // 至少两个chunk共享的模块才会被分割到commons组
							name: "commons",  // 输出文件名为commons
							priority: 110  // 优先级设为110
						}
					}
				}
			})
			return webpackConfig
		}
	},
	babel: {
		plugins: [
			...whenProd(
				() => [
					["@babel/plugin-proposal-decorators", { legacy: true }]  // 支持装饰器语法
				],
				[]
			)
		]
	},
	plugins: [],
	eslint: {
		enable: false  // 禁用ESLint
	}
}
```

