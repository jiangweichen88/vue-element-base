'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const CompressionPlugin = require("compression-webpack-plugin");

const productionGzipExtensions = ["js", "css"];

function resolve(dir) {
	return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'Vue Element Base' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

//所有配置项的说明可以在https://cli.vuejs.org/config/中找到
module.exports = {
	publicPath: './',
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: process.env.NODE_ENV === 'development',
	productionSourceMap: false,
	//	productionGzip:true,
	//	productionGzipExtensions:['js','css'],
	devServer: {
		port: port,
		open: true,
		overlay: {
			warnings: false,
			errors: true
		},
		before: require('./mock/mock-server.js')
	},
	configureWebpack: {
		name: name,
		resolve: {
			alias: {
				'@': resolve('src')
			}
		},
		plugins: [
			new CompressionPlugin({
				test: /\.(js|css)?$/i, // 哪些文件要压缩
				filename: '[path].gz[query]',
				　 // 压缩后的文件名
				algorithm: 'gzip',
				　 // 使用gzip压缩
				minRatio: 1,
				　 // 压缩率小于1才会压缩
				deleteOriginalAssets: true // 删除未压缩的文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false
			})
		]
	},
	chainWebpack(config) {
		//它可以提高第一屏的速度，建议打开预载
		config.plugin('preload').tap(() => [{
			rel: 'preload',
			// to ignore runtime.js
			// https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
			fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
			include: 'initial'
		}])

		//当有很多页面时，会导致太多无意义的请求
		config.plugins.delete('prefetch')

		// set svg-sprite-loader
		config.module
			.rule('svg')
			.exclude.add(resolve('src/icons'))
			.end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
			.end()

		config
			.when(process.env.NODE_ENV !== 'development',
				config => {
					config
						.plugin('ScriptExtHtmlWebpackPlugin')
						.after('html')
						.use('script-ext-html-webpack-plugin', [{
							// `runtime` must same as runtimeChunk name. default is `runtime`
							inline: /runtime\..*\.js$/
						}])
						.end()
					config
						.optimization.splitChunks({
							chunks: 'all',
							cacheGroups: {
								libs: {
									name: 'chunk-libs',
									test: /[\\/]node_modules[\\/]/,
									priority: 10,
									chunks: 'initial' // only package third parties that are initially dependent
								},
								elementUI: {
									name: 'chunk-elementUI', // split elementUI into a single package
									priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
									test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
								},
								commons: {
									name: 'chunk-commons',
									test: resolve('src/components'), // can customize your rules
									minChunks: 3, //  minimum common number
									priority: 5,
									reuseExistingChunk: true
								}
							}
						})
					// https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
					config.optimization.runtimeChunk('single')
				}
			);
		if(process.env.NODE_ENV == 'production') {
			config
				.plugin('webpack-bundle-analyzer')
				.use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
		}
	}
}