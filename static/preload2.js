/**
 * description：
 * @author Kevin
 * @date 2022/6/13
 */

const { contextBridge, icpRerender } = require("electron")

contextBridge.exposeInMainWorld('apiKey', {
	fn: ()=>{}
})

icpRerender.sendToHost('type', "payload")


