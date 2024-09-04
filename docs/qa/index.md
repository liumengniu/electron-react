# 常见问题

## 常见问题


* [安装依赖失败，无法跑起来](#question-1)
* [生产的时候白屏](#question-2)
* [webview 无法加载](#question-3)
* [修改应用图标失败](#question-4)
* [如何对主进程进行调试](#question-5)
* [linux环境自动更新之后图标不显示，而是桌面默认图标](#question-6)
* [桌面应用如何操作第三方网页](#question-7)


### 安装依赖失败
```
三种解决方法，无法跑起来
1. 使用科学上网工具
2. 配置electron 镜像
3. 从其他源下载依赖之后解压至相关目录
```
***

### 生产的时候白屏
<a id="question-2"></a>
```
一般是主进程报错，可以在生产打开 devtool去查找错误，解决错误后生产关闭devtool
```
***

### webview无法加载
<a id="question-3"></a>
```
electron12以后得版本默认关闭webview，需要在主进程创建主窗口时 配置【webviewTag=true】
```
***

### 图标无法修改
<a id="question-4"></a>
```
一般图标问题不大，有个暗坑，在尺寸超过400kb之后，ico无法显示，需要改为png格式
```
***

### 如何对主进程进行调试
<a id="question-5"></a>
```
两种解决方法
1. 可以在生产打开 devtool去查找错误
2. --inspect=[port]
    Electron 将监听指定 port 上的 V8 调试协议消息， 外部调试器需要连接到此端口上。 port 默认为 5858。
    electron --inspect=5858 your/app

```
***

### linux环境自动更新之后图标不显示，而是桌面默认图标
<a id="question-6"></a>
```
linux的自动更新只能适用于 编译AppImage，也就是无需安装的绿色包，这种包是无法通过程序去配置图标的
```
***

### 桌面应用如何操作第三方网页
<a id="question-7"></a>
```
通过注入脚本的方式操作，第三方网页的进程通信需要注册 预加载js文件
```
***