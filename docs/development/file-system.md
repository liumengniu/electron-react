# 文件系统
应用相关的文件系统

## 1、文件路径
> <font style="color:rgb(28, 30, 33);"> 当前应用程序目录</font>
>

```plain
app.getAppPath()
```

> <font style="color:rgb(28, 30, 33);">当前应用程序全部路径</font>
>

```plain
app.getPath(name)
```

| name名称 | 具体目录 | 备注 |
| --- | --- | --- |
| home | 用户的 home 文件夹（主目录） | |
| appData  | 每个用户的应用程序数据目录，默认情况下指向 | + %APPDATA% Windows 中<br/>+ $XDG_CONFIG_HOME or ~/.config Linux 中<br/>+ ~/Library/Application Support macOS 中 |
| userData | 储存你应用程序设置文件的文件夹，默认是 appData 文件夹附加应用的名称 | |
| cache | | |
| temp | <font style="color:rgb(28, 30, 33);">临时文件夹</font> | |
| exe  | <font style="color:rgb(28, 30, 33);">当前的可执行文件</font> | |
| module  | <font style="color:rgb(28, 30, 33);">The </font>libchromiumcontent<font style="color:rgb(28, 30, 33);"> 库</font> | |
| desktop | <font style="color:rgb(28, 30, 33);">当前用户的桌面文件夹</font> |  |
| documents<font style="color:rgb(28, 30, 33);"> </font> | <font style="color:rgb(28, 30, 33);">用户文档目录的路径</font> | |
| downloads<font style="color:rgb(28, 30, 33);"> </font> | <font style="color:rgb(28, 30, 33);">用户下载目录的路径</font> | |
| music<font style="color:rgb(28, 30, 33);"> </font> | <font style="color:rgb(28, 30, 33);">用户音乐目录的路径</font> | |
| pictures | <font style="color:rgb(28, 30, 33);">用户图片目录的路径</font> | |
| videos | <font style="color:rgb(28, 30, 33);">用户视频目录的路径</font> | |
| recent | <font style="color:rgb(28, 30, 33);"> 用户最近文件的目录 (仅限 Windows)。</font> | |
| logs | <font style="color:rgb(28, 30, 33);">应用程序的日志文件夹</font> | |
| crashDumps | <font style="color:rgb(28, 30, 33);">崩溃转储文件存储的目录</font> | |


:::info
<font style="color:rgb(28, 30, 33);">If </font>app.getPath('logs')<font style="color:rgb(28, 30, 33);"> is called without called </font>app.setAppLogsPath()<font style="color:rgb(28, 30, 33);"> being called first, a default log directory will be created equivalent to calling </font>app.setAppLogsPath()<font style="color:rgb(28, 30, 33);"> without a </font>path<font style="color:rgb(28, 30, 33);"> parameter.</font>

:::

## 2、操作文件
### <font style="color:rgb(28, 30, 33);">1、node.js的文件模块fs</font>


### 2、electron 原生的文件操作


