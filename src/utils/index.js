/**
 * 工具函数
 * @author Kevin
 * @Date:
 */

import { downLoadFile } from '@/renderer/api/base'

const utils = {
	/**
	 * 判断值是不是一个json数据
	 * @param str
	 */
	isJson: function (str) {
		if (typeof str == 'string') {
			try {
				let obj = JSON.parse(str)
				if (typeof obj == 'object' && obj) {
					return true
				} else {
					return false
				}
			} catch (e) {
				return false
			}
		}
	},
	/**
	 * 是否是 base64
	 * @param str
	 * @returns {boolean}
	 */
	isBase64: function (str) {
		if (str === '' || str.trim() === '') {
			return false
		}
		try {
			return btoa(atob(str)) == str
		} catch (err) {
			return false
		}
	},
	/**
	 * 通用下载方法
	 * @param hash
	 * @param name
	 * @returns {Promise<void>}
	 */
	downLoadCommon: async function (hash, name = Date.now()) {
		let blob = await downLoadFile({ fileHash: hash, fileName: name })
		if (blob.type === 'application/json') {
			let text = await blob.text()
			let res = JSON.parse(text)
			if (!res.success) {
				return Promise.reject(res)
			}
		}
		let a_link = document.createElement('a')
		a_link.href = URL.createObjectURL(blob)
		a_link.download = name //下载的文件的名字
		document.body.appendChild(a_link)
		a_link.click()
		URL.revokeObjectURL(a_link.href)
		return Promise.resolve(blob)
	}
}

export default utils
