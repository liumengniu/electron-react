> 在我们开发一些业务比较复杂的程序时，开发者们往往在重要时刻记录一些日志，这些日志在排查问题的时候，跟踪调用流程时特别有用。因为一旦程序出现问题，如果没有日志，又不能让用户去复现问题的话，我们往往需要大量时间去一步步排查和跟踪，如果有业务日志，就可以根据日志整理出一个业务处理链条，顺着这个业务链条就可以就可以得到程序处理的过程，定位并复现问题
>

## 1、安装日志工具
```plain
npm i electron-log
```

## 2、log工具函数
electron5.x 以上会报 require is not defined

electron11.x 以下需要 main.js修改 nodeIntegration 属性为true

![](https://cdn.nlark.com/yuque/0/2022/png/1144659/1651906864996-0e2c61a2-71d6-464f-b089-e6cae762f11e.png)

electron12.x 以上需要在 main.js修改 contextIsolation属性为false

![](https://cdn.nlark.com/yuque/0/2022/png/1144659/1651906900863-1fe0519a-f6f8-48d9-adae-4f2ca3e71d64.png)

<font style="background:#F8CED3;color:#70000D">路径查询方法app.getPath()在不同版本的api使用方法不一样，注意查看文档</font>

```plain
import {app} from "electron"
import logger from "electron-log"

logger.transports.file.level = 'debug';
logger.transports.file.maxSize = 1024 * 10;     //10m
logger.transports.file.format = '[{y}-{m}-{d} {h}-{i}-{s}-{ms}] [{level}]{scope} {text}'
let date = new Date();
let time = date.getFullYear() + '-' + (date.getMonth() +1) + '-' + date.getDate();
logger.transports.file.file = app.getPath('userData') + '\\electron_log\\app\\' + time + '.log';

export default {
	info(param){
		logger.info(param);
	},
	warn(param){
		logger.warn(param);
	},
	error(param){
		logger.error(param);
	},
	debug(param){
		logger.debug(param);
	},
	verbose(param){
		logger.verbose(param);
	},
	silly(param){
		logger.silly(param);
	}
}
```

## 3、渲染进程使用
> 开发环境的 userData 路径在 C:\Users\thgy\AppData\Roaming\Electron\electron_log\app下， 生产环境在自定义的路径下
>

```plain
import {app, remote}  from 'electron'
import logger from "./utils/log";
logger.warn("这是一个日志")
```

![](https://cdn.nlark.com/yuque/0/2022/png/1144659/1651905653645-79161e32-3354-4a30-999a-1f3c51597773.png)

## 4、主进程回调
> electron-log也可以直接在主进程中打印日志，用法同 3
>



Electron有主进程和渲染进程，一般呢我们通过渲染进程的控制台network就可以看到程序发起的网络请求。但是使用这个方法呢会有三个问题：

1.无法监控主进程发起的网络请求；

2.Electron呢可能会有多个窗口，不同的窗口发起不同的请求可能存在关联关系，就需要联合监控，就非常麻烦。

3.无法精确的分析某个时段的网络请求。

为了弥补这方面的不足，Electron提供了netLog模块，允许开发人员通过编程的方式记录网络请求。

```plain
netLog
```

## 5、系统错误日志
> <font style="color:rgb(77, 77, 77);">Electron内置了崩溃报告上报模块crashReporter，我们可以利用此模块收集应用程序崩溃时环境情况和产生的异常数据，并让程序把这些数据提交到提前准备的web服务器上面去。</font>
>

```plain
const { crashReporter } = require('electron')
crashReporter.start({ submitURL: 'https://www.baidu.com', productName: 'electron-start' })
```

## 6、行为数据埋点


