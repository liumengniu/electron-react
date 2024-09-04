:::info
+ <font style="color:rgb(18, 18, 18);">electron-builder 构建结束后会生成一个 latest.yml 包含了打包后应用的版本等信息</font>
+ <font style="color:rgb(18, 18, 18);">将 latest.yml 和exe安装包文件放在一个静态资源服务器上（如</font>[http://a.b.c/publish）](https://link.zhihu.com/?target=http%3A//a.b.c/publish%25EF%25BC%2589)(本机或者远程服务器都可)
+ <font style="color:rgb(18, 18, 18);">项目启动后操作 electron-updater 检查更新</font>
+ <font style="color:rgb(18, 18, 18);">即使更新包目录下存在多个版本，electron-updater会自动找最新的安装包（比如存在 1.1.2 和1.1.3，会自动更新最新的1.1.3）</font>

:::

## <font style="color:rgb(18, 18, 18);">1、安装</font>
> <font style="color:rgb(18, 18, 18);">不要 -dev，不然自动更新时会报错</font>
>

```plain
npm i electron
```

## <font style="color:rgb(18, 18, 18);">2、配置</font>
+ <font style="color:rgb(18, 18, 18);">依赖表</font>配置

```plain
package.json下面的 build属性添加

"publish": [
   {
      "provider": "generic",
       //你的新包静态服务器地址，可以是本机，有网能访问就行
      "url": "http://localhost:3000/zip"       
]
```

+ 主进程文件配置

```plain
const { autoUpdater  } = require('electron-updater')
const { app, BrowserWindow,ipcMain, dialog } = require('electron')
const path = require('path')
const log = require("electron-log")
log.transports.file.level = "debug"

let mainWindow;

const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	})
	// 加载 index.html
	mainWindow.loadFile('index.html')
	// 打开开发工具
	mainWindow.webContents.openDevTools()
}

let message = {
	error: '检查更新出错',
	checking: '正在检查更新……',
	updateAva: '检测到新版本，正在下载……',
	updateNotAva: '现在使用的就是最新版本，不用更新',
};

autoUpdater.setFeedURL("http://localhost:3000/zip");

autoUpdater.on('error', function (error) {
	sendUpdateMessage(message.error)
});
autoUpdater.on('checking-for-update', function () {
	sendUpdateMessage(message.checking)
});
autoUpdater.on('update-available', function (info) {
	sendUpdateMessage(message.updateAva)

});
autoUpdater.on('update-not-available', function (info) {
	sendUpdateMessage(message.updateNotAva)
});

// 更新下载进度事件
autoUpdater.on('download-progress', function (progressObj) {
	console.log(progressObj)
	mainWindow.webContents.send('downloadProgress', progressObj)
})
autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
	console.log('更新完成')
	mainWindow.webContents.send('isUpdateNow')
	autoUpdater.quitAndInstall();
});


ipcMain.on("checkUpdate", ()=>{
	autoUpdater.logger = log;
	autoUpdater.checkForUpdates();
})

app.whenReady().then(() => {
	createWindow()
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})


function sendUpdateMessage(text) {
	mainWindow.webContents.send('message', text)
}
```

+ 渲染文件

> 主要是控制更新时机，非必须
>

```plain
const { ipcRenderer } = require("electron")

const btn = document.getElementById("btn")
btn.onclick = function (){
	console.log("=============== start checkUpdate ===============")
	ipcRenderer.send("checkUpdate", "checkUpdate")
}
```

## 3、本地服务
> 此处以本地node 服务模拟一个服务器静态资源地址
>

```plain
const express = require("express")
const app = express()
app.use(express.static('public')); //监控静态资源，提供给客户端访问
app.listen(3000, ()=> { console.log("app is listening port 3000")});
```

模拟服务的的相对文件路径

![](https://cdn.nlark.com/yuque/0/2022/png/1144659/1652018927696-4ea88332-0b91-4046-9b0b-edc05f0a4aa7.png)

## 4、更新流程实例
:::info
1. 编译第一个版本1.0.0，并分发给使用者安装及使用（package.json修改 version为1.0.0）
2. 接到新的需求，开发完成
3. 编译新的需求版本1.1.0（<font style="color:#F5222D;">package.json修改 version为1.1.0</font>），并上传至静态服务器上
4. 1.0.0版本用户软件包检测到有更新，退出软件并下载更新包
5. 按照指引安装新包，安装完成，开始使用新版本

:::

![画板](https://cdn.nlark.com/yuque/0/2022/jpeg/1144659/1652020112948-c974f89d-9505-40d0-97bd-502b44dd5a76.jpeg)

