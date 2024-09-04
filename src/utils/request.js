/**
 * @author Kevin
 * @Date:
 */

/**
 * 描述：服务请求公共方法
 * @author Kevin
 * @date 2021/12/11
 */

import _ from 'lodash'
import qs from 'qs'
import TokenManager from '@/utils/TokenManager'
import {useNavigate} from "react-router-dom";

let mock = false
const baseUrl = process.env.REACT_APP_BASE_API + ''

const request = {
	/**
	 * 基础请求
	 * @param url
	 * @param {RequestInit&{params:object|string,mock:boolean}} options
	 * @returns {Promise<unknown>}
	 */
	request: function (url, options = { method: 'get' }) {
		// 判断是否使用apifox模拟服务
		if (mock || options.mock) {
			url =
				'http://127.0.0.1:4523/m1/1953581-0-016abbbc' +
				url.replace(/^[/](common|applet)/gim, '')
		} else {
			url = baseUrl + url
		}

		// 设置默认值
		if (!options.method) {
			options.method = 'get'
		}
		if (_.isEmpty(options.headers)) {
			options.headers = {}
		}

		// 序列化query
		let query = '?'
		switch (typeof options.params) {
			case 'object':
				query += qs.stringify(options.params, { indices: false })
				break
			case 'string':
				query += options.params
				break
		}
		url += `${query}&_t=${Date.now()}`

		// 处理body
		if (options.method !== 'GET') {
			// 当不是get方法是，才去处理data
			if (options.data instanceof FormData) {
				options.body = options.data
			} else if (typeof options.data !== 'string') {
				options.headers['Content-Type'] = 'application/json'
				options.body = JSON.stringify(options.data)
			}
		}

		// 设置token
		if (TokenManager.getToken()) {
			options.headers['token'] = TokenManager.getToken()
		}

		return new Promise((resolve, reject) => {
			fetch(url, options)
				.then((res) => {
					//关闭全局loading
					_.isFunction(options.cb) && options.cb()
					if (options.responseType === 'blob') {
						return res.blob()
					}
					if (options.responseType === 'arraybuffer') {
						return res.arrayBuffer()
					}
					return res.json()
				})
				.then((data) => {
					if (options.responseType === 'blob' || options.responseType === 'arraybuffer') {
						resolve(data)
					} else if (_.toNumber(data.code) !== 200) {
						message.error(data.msg || data.errorMsg || data.message)
						if(data.code === "010000" || data.code === "010001"){
							TokenManager.removeAll()
						}
						reject(data)
					} else {
						resolve(data)
					}
				})
				.catch((error) => {
					message.error(error.message)
					reject(error)
				})
		})
	},
	/**
	 * get请求
	 * @param url
	 * @param options
	 * @returns {Promise<void>}
	 */
	get: async function (url, options = {}) {
		let params = options.data
		options.data = undefined
		return this.request(url, {
			...options,
			method: 'get',
			params
		})
	},
	/**
	 * post请求
	 * @param url
	 * @param options
	 * @returns {Promise<void>}
	 */
	post: async function (url, options = { method: 'post' }) {
		return this.request(url, {
			...options,
			method: 'post',
			data: options.data
		})
	}
}

export default request
