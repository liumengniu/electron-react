/**
 * description：token操作
 * @author Kevin
 * @date 2022/3/11
 */

const tokenKey = "xxx_token";
const expirationTimeKey = 'expiration_time';
const providerType = "provider_type";

const TokenManager = {
	setToken: function (token) {
		localStorage.setItem(tokenKey, token);
	},
	setExpirationTime: function (expiration_time) {
		localStorage.setItem(expirationTimeKey, expiration_time);
	},
	setProviderType: function (type) {
		localStorage.setItem(providerType, type);
	},
	getToken: function () {
		return localStorage.getItem(tokenKey);
	},
	getExpirationTime: function () {
		return localStorage.getItem(expirationTimeKey);
	},
	getProviderType: function () {
		return localStorage.getItem(providerType);
	},
	removeToken: function () {
		localStorage.removeItem(tokenKey);
	},
	removeExpirationTime: function () {
		localStorage.removeItem(expirationTimeKey);
	},
	removeAll: function () {
		localStorage.clear();
	}
}

export default TokenManager
