/**
 * @author Kevin
 * @Date: 2024-4-10
 */
'use strict'
const path = require('path')

module.exports = {
	context: path.resolve(__dirname, './'),
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'@': path.resolve('src'),
			'@statics': path.resolve(__dirname, 'src/renderer/statics'),
			'@views': path.resolve(__dirname, 'src/renderer/views'),
			'@comp': path.resolve(__dirname, 'src/renderer/components'),
			'@services': path.resolve(__dirname, 'src/renderer/services'),
			'@api': path.resolve(__dirname, 'src/renderer/api'),
			'@utils': path.resolve(__dirname, 'src/renderer/utils'),
			'@redux': path.resolve(__dirname, 'src/renderer/redux'),
			'@styles': path.resolve(__dirname, 'src/renderer/styles'),
			'@configs': path.resolve(__dirname, 'src/renderer/configs'),
		}
	}
}
