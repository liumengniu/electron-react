:::info
electron-updater仅提供了AppImage格式的自动更新，AppImage是一种兼容各种linux环境架构的镜像，类似于windows的绿色版本，无需安装流程，即开即用

:::

> linux环境更新流程如下
>

:::info
1. 编译第一个版本1.0.0，并分发给使用者安装及使用（package.json修改 version为1.0.0），用户手动添加桌面快捷方式，并授权（有的linux版本必须要用户授权）
2. 接到新的需求，开发完成
3. 编译新的需求版本1.1.0（<font style="color:#F5222D;">package.json修改 version为1.1.0</font>），并上传至静态服务器上
4. 1.0.0版本用户软件包检测到有更新，退出软件并下载更新包
5. 按照指引安装新包，安装完成，开始使用新版本

:::

![画板](https://cdn.nlark.com/yuque/0/2022/jpeg/1144659/1652020112948-c974f89d-9505-40d0-97bd-502b44dd5a76.jpeg)

## 1、编译AppImage包
在package.json的脚本执行列表中，添加如下命令，并且执行

```plain
x86架构
"build:linux": "electron-builder --linux",

arm64架构，比如麒麟
"build:linux:arm64": "electron-builder --linux --arm64",
```

<font style="color:#DF2A3F;">PS：package.json根节点需要添加 “author”属性，并且著名邮箱，不然编译会直接报错</font>

## 2、使用AppImage包
参照第9大章，第4小节

## 3、添加桌面快捷方式
1. 打开文件管理器，导航到包含您的 AppImage 文件的目录。
2. 右键单击 AppImage 文件，在上下文菜单中选择 "Copy"（复制）。
3. 在文件管理器中导航到桌面目录。在大多数 Ubuntu 桌面环境中，您可以在左侧的侧边栏中找到 "Desktop"（桌面）文件夹。
4. 在桌面目录中，右键单击空白区域，在上下文菜单中选择 "Paste"（粘贴）。这将在桌面上创建 AppImage 文件的快捷方式。
5. 您可能还需要更改快捷方式的名称和图标，以便更好地识别应用程序。右键单击快捷方式，选择 "Rename"（重命名）来更改名称，并选择 "Properties"（属性）来更改图标。
6. 在 "Properties"（属性）对话框中，您可以找到一个 "Icon"（图标）字段，可以单击 "Browse"（浏览）按钮来选择您希望用于快捷方式图标的图标文件。一些应用程序可能在打包时包含了一个 .png 或 .svg 格式的图标文件，您可以查找类似 "app-icon.png" 或 "app-icon.svg" 的文件。如果没有预定义的图标文件，您可以选择系统提供的图标，例如位于 /usr/share/icons 目录中的图标。
7. 设置好名称和图标后，点击 "OK"（确定）按钮，应用更改。

## 4、编译新需求版本
### 1、修改依赖表
package.json的版本号修改为高于上一个版本即可，比如上个版本是1.0.0，此次可以改为 1.0.1

### 2、编写自动更新代码
windows和 linux 可共用一套代码，自动更新是通过 latest.yml(windows环境更新配置)和 latest-linux（linux环境更新配置）来区分的

**根目录下electron入口文件 main.js**

```plain
// 加载预加载文件preload.js
mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			// 不设置这行，会报 require is not defined
			nodeIntegration: true,
			contextIsolation: true,
			allowRunningInsecureContent: true,
		},
	})

/**
 *=========================================================================
 *=                                                                       =
 *=                       4.桌面应用自动更新                                 =
 *=                                                                       =
 *=========================================================================
 */

/**
 * 获取版本号
 * @returns {string}
 */
function getVersion(){
	return app.getVersion();
}
ipcMain.handle("getVersion", getVersion)

function sendUpdateMessage(text) {
	mainWindow.webContents.send('message', text)
}

let message = {
	error: '检查更新出错',
	checking: '正在检查更新……',
	updateAva: '检测到新版本，正在下载……',
	updateNotAva: '现在使用的就是最新版本，不用更新',
};

autoUpdater.setFeedURL({
	provider: "generic",
	url: "https://www.cjkwb.cn/map/client-kylin"
});
// autoUpdater.autoInstallOnAppQuit = true;

autoUpdater.on('error', function (error) {
	dialog.showErrorBox("更新异常", error.message);
	mainWindow.webContents.send('updateError')
});
autoUpdater.on('checking-for-update', function () {
	sendUpdateMessage(message.checking)
});
autoUpdater.on('update-available', function (info) {
	dialog.showErrorBox("update-available", "更新可用" + JSON.stringify(info));
	mainWindow.webContents.send('updateAvailable')
});
autoUpdater.on('update-not-available', function (info) {
	dialog.showErrorBox("update-not-available", "更新不可用" + JSON.stringify(info));
	mainWindow.webContents.send('updateNotAvailable')
});

// 更新下载进度事件
autoUpdater.on('download-progress', function (progressObj) {
	console.log("更新的进度", progressObj)
	mainWindow.webContents.send('downloadProgress', progressObj)
})
autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
	dialog.showErrorBox("执行update-downloaded", "更新完成，开始安装" + updateUrl);
	autoUpdater.quitAndInstall();
});

ipcMain.on("checkUpdate", ()=>{
	dialog.showErrorBox("执行checkUpdate", "开始检测更新");
	autoUpdater.logger = log;
	// autoUpdater.checkForUpdates();
	autoUpdater.checkForUpdatesAndNotify()
})
```

**preload.js  （主线程与渲染线程的桥接文件，此处我们采用手动点击更新，如果静默强制更新，则不需要桥接）**

```plain
/**
 * description： 预加载js，进程通信
 * @author Kevin
 * @date 2022/6/6
 */

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
	/**
	 * ====================================  渲染进程 -> 主进程（单向）  =======================================
	 */
	/**
	 * 设置当前路由
	 * @param title
	 */
	setRouter: (title) => ipcRenderer.send('currentRouter', title),
	/**
	 * 窗体最小化
	 * @param title
	 */
	setWinMin: (title) => ipcRenderer.send('window-min'),
	/**
	 * 窗体最大化
	 * @param title
	 */
	setWinMax: (title) => ipcRenderer.send('window-max'),
	/**
	 * 关闭视窗
	 * @param title
	 */
	setWinClose: (title) => ipcRenderer.send('window-close'),
	
	/**
	 * 初始化 BrowserView （视图，和webview 有点点不同）
	 * @param url
	 */
	initBrowserView:(url) => ipcRenderer.send('init-browser-view', url),
	/**
	 * 打开浏览器
	 * @param url
	 */
	openExternal: url =>ipcRenderer.send('openExternal', url),
	/**
	 * 唤起cmd脚本
	 */
	shellCmd: systemId => ipcRenderer.send('shellCmd', systemId),
	
	/**
	 * 拖拽窗体顶部
	 */
	moveApplication: position => ipcRenderer.send('moveApplication', position),
	/**
	 * 检查更新
	 */
	checkUpdate: () => ipcRenderer.send('checkUpdate'),
	/**
	 * 重新加载(web端有缓存)
	 */
	reload: () => ipcRenderer.send('reload'),
	/**
	 * ====================================== 渲染进程 -> 主进程(双向)  =======================================
	 */
	getVersion: () => ipcRenderer.invoke('getVersion'),
	
	/**
	 * ====================================== 主进程 -> 渲染进程  =======================================
	 */
	downloadProgress: (callback) => ipcRenderer.on('downloadProgress', callback),
	isUpdateNow: (callback) => ipcRenderer.on('isUpdateNow', callback),
	confirmUpdate: (callback) => ipcRenderer.on('confirmUpdate', callback),
	updateAvailable: (callback) => ipcRenderer.on('updateAvailable', callback),
	updateNotAvailable: (callback) => ipcRenderer.on('updateNotAvailable', callback),
	updateError: (callback) => ipcRenderer.on('updateError', callback),
})

```

**渲染线程手动更新文件**

```plain
 /**
   * 检查更新
   */
  const checkUpdate = () => {
    window.electronAPI && window.electronAPI.checkUpdate();
    window.electronAPI && window.electronAPI.updateAvailable((_event, mainParams) => {
      alert("更新可用，开始更新")
    });
    window.electronAPI && window.electronAPI.updateNotAvailable((_event, mainParams) => {
      alert("当前已是最新版本，无需更新")
    });
    window.electronAPI && window.electronAPI.updateError((_event, mainParams) => {
      alert("updateError，无需更新")
    });
  }
```

### 3、编译新版本
按照架构不同执行 electron-builder --linux 或者  electron-builder --linux --arm64 命令，得到新版本的AppImage包和 更新yml文件，如下图所示

![](https://cdn.nlark.com/yuque/0/2023/png/1144659/1691117715067-58f72e4e-3229-4e2b-b0e3-1cc798eb13f9.png)

### 4、将新版本AppImage 和 latest-linux.yml文件上传至更新地址
![](https://cdn.nlark.com/yuque/0/2023/png/1144659/1691118575617-bab43b67-ce1c-4767-a9ab-46a4c9c1e54a.png)

**<font style="color:#DF2A3F;">注意：麒麟系统是 xxx-arm64.AppImage 和 latest-linux-arm64.yml上传至更新的指向地址，如下所示文件</font>**

![](https://cdn.nlark.com/yuque/0/2023/png/1144659/1691145050122-39cfa074-c78f-49db-bb4c-5e649d2622b2.png)

并且验证可以通过 浏览器url访问，如下图所示

![](https://cdn.nlark.com/yuque/0/2023/png/1144659/1691118924435-a5a22214-8d69-422f-91a9-0af0b7ced74d.png)

### 5、更新版本
![](https://cdn.nlark.com/yuque/0/2023/png/1144659/1691119699490-bb4144b2-adf1-45c9-b175-79d6ad8a4671.png)

![](https://cdn.nlark.com/yuque/0/2023/png/1144659/1691119789930-be0a6b8c-04fa-4f1a-bb26-905d6eb12bef.png)

![](https://cdn.nlark.com/yuque/0/2023/png/1144659/1691119906874-858f3eec-fc44-4fa1-9e7b-442e45922f8c.png)

![](https://cdn.nlark.com/yuque/0/2023/png/1144659/1691119927490-bf213495-1296-4712-bd59-3ea64aaedc38.png)

更新完成后，会get一个最新版本的AppImage文件，代表更新完成（PS：有些linux版本可以需要重新对此AppImage文件授权）

![](https://cdn.nlark.com/yuque/0/2023/png/1144659/1691122042172-ae091563-c80e-4b30-b60e-1e46ffd7bb2e.png)





