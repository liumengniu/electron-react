/**
 * @author Kevin
 * @Date:
 */

import request from "@utils/request";

/**
 * 下载文件
 * @param data
 * @returns {Promise<void>}
 */
export function downLoadFile(data){
	return request.get("/common/file/downLoad", {data, responseType: "blob"});
}