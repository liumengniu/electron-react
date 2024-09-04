:::info
常用的打包包括 electron-builder 和  electron-packager



:::

![画板](https://cdn.nlark.com/yuque/0/2023/jpeg/1144659/1690969933586-b1411557-6de1-415c-af55-591243b1a4cb.jpeg)

## 1、electron-builder（windows）
### 1、安装
```plain
npm i electron-builder --save-dev  
```

<font style="color:#DF2A3F;">最新版23.x 打包后安装包无法正常安装，建议使用之前的版本</font>（我此处采用 版本22.14.13，只要是23以前的都可以）

### 2、配置
> package.json的 <font style="color:#9876aa;">scripts</font> 项添加如下命令，打包命令是 npm run build
>

```plain
"build": "electron-builder",
"build:dir": "electron-builder --dir",
"postinstall": "electron-builder install-app-deps",
```

> package.json添加 "build"属性
>

"requestedExecutionLevel": "requireAdministrator" 是<font style="color:#DF2A3F;">权限请求，非常重要</font>

```plain
"build": {
    // 这一行解决Application entry file "build/electron.js" in the 
    //"<path>/dist/mac/<app-name>/Contents/Resources/app.asar" does not exist.报错，
    //可能导致扩展不可用（未验证是否有其他问题）
    "extends": null,                     
    "productName": "electron-start",        //项目名
    "appId": "com.thgy.start",              //项目id，在同一台机器上代表软件唯一标识
    "directories": {
      "output": "build"
    },
    "win": {
      "target": [
        "nsis",
        "zip"
      ],
			"requestedExecutionLevel": "requireAdministrator"
    }
  },
```

### 3、打包
```plain
npm run build
```

![](https://cdn.nlark.com/yuque/0/2022/png/1144659/1651825423863-b210c2fb-46a7-4fde-ba72-b9507eef8c03.png)

> 在根目录下输出了build文件夹，里面包括 安装包，可分发的压缩包 和 全部资源文件
>

![](https://cdn.nlark.com/yuque/0/2022/png/1144659/1651825504844-f0bd91d3-c484-4a7b-8a37-8a056e549820.png)

|                       1 |                         2 |                             3 |
| --- | --- | --- |
| 全部文件资源包，里面有启动exe文件 | 安装包，不暴露源码，点击后直接安装到C盘，默认路径在 <br/>![](https://cdn.nlark.com/yuque/0/2022/png/1144659/1651825777831-32adfd13-4a45-45ca-a2cd-dac48a021f16.png) | 压缩包，解压后基本就是1的东西，<font style="color:#F5222D;">如果分发，建议分发此压缩包</font> |


## 2、electron-builder（linux）
### 1、安装依赖
主要是需要装 snapcraft，否则会报错

```plain
sudo snap install snapcraft --classic
```

### 2、配置
package.json需要添加 author，配置名称、邮箱

```plain
{
  "name": "gov-approve-client",
  "author" : "Kevin <15111205994@163.com> (http://thgygogs.tianhecloud.com/GovApprove/gov-approve-client.git)",
  ...
}
```

package.json下的 scripts 属性，增加 linux 下的打包命令

```plain
"build:deb": "electron-builder --linux deb tar.xz",
PS：此命令是打deb包和deb的压缩包，如果是其他内核，参照文档命令，默认是amd64架构

"build:deb:arm": "electron-builder --linux deb --arm64"
PS：此命令是打arm64架构的deb包和deb的压缩包，如果是其他架构，参照文档命令
```

根据 electron-builder的icon文档

:::info
![](https://cdn.nlark.com/yuque/0/2022/png/1144659/1667465933897-16448ed3-a91d-4746-8967-dcf534d4a0f4.png)

:::

<font style="color:#D22D8D;">文档上显示，会默认在build/icons下取带尺寸的png图标作为图标</font>

所以在public文件夹下新建  icons，新增一张256*256的png（linux必须png，且最少256*256），图片命名必须是尺寸（比如 icon-256x256.png 或者 256x256.png等），web项目build后，会自动在build下面生成icons文件夹，并包含256x256png这张资源。

![](https://cdn.nlark.com/yuque/0/2022/png/1144659/1667465687585-182c7e60-350b-46ac-9faa-ea5bf3b946dd.png)

### 3、打包
输入打包命令 npm run build:deb，出现如下图，说明打包成功

![](https://cdn.nlark.com/yuque/0/2022/png/1144659/1667451567565-83e18cbc-cce3-42b0-9172-9318f64d4ba0.png)

**<font style="color:#D22D8D;">常见报错</font>**

1、electron的linux包无法下载下来，可能需要多试几次，或者直接去源地址下载，然后放入依赖（如下图所示）

![](https://cdn.nlark.com/yuque/0/2022/png/1144659/1667461144137-0e0b4401-1564-43e9-8ff1-c0008dd79884.png)

2、package.json未配置 email，配置 author 属性即可

![](https://cdn.nlark.com/yuque/0/2022/png/1144659/1667453599947-f0f8da24-7565-48bc-8373-3a4c39efb244.png)

3、磁盘内存不够，重启虚拟机最快，或者加大一点虚拟内存

![](https://cdn.nlark.com/yuque/0/2022/png/1144659/1667463313351-4e09ca96-40d6-47a4-a19c-cbb0f1430290.png)

### 4、安装软件
#### 1、.deb安装
进入打包输出的文件夹release，敲击命令 ls ，有deb文件 和 AppImage文件，都可以安装，此处我们用deb安装

:::info
amd64架构

:::

![](https://cdn.nlark.com/yuque/0/2022/png/1144659/1667451827779-f4f32aac-e3be-44f6-a727-004a5a477bc5.png)

:::info
ram64架构

:::

![](https://cdn.nlark.com/yuque/0/2023/png/1144659/1690969434226-77d5a7e6-ea07-4a08-b276-c30ac8b06216.png)

```plain
安装deb包命令
sudo dpkg -i xxx.deb
```

**<font style="color:#DF2A3F;">PS: 要注意系统架构，此处 的ubuntu是 amd64架构，deb可以直接安装， 如果是arm64架构（比如国产麒麟），需要编译对应架构的 deb 包</font>**

![](https://cdn.nlark.com/yuque/0/2022/png/1144659/1667451933909-b0416d9c-ea83-4cc9-b299-e89ca2051923.png)

安装成功，双击启动，完全正常

![](https://cdn.nlark.com/yuque/0/2022/png/1144659/1667466171543-65b4cbf8-f9ad-45fe-8514-2f9935d80304.png)

#### 2、AppImage
AppImage格式是一个镜像，类似于绿色版，无需安装，所有文件都在镜像内，支持自动升级

```plain
编译x86架构的AppImage包
"build:linux": "electron-builder --linux",

编译arm64架构的AppImage包（适配麒麟）
"build:linux:arm64": "electron-builder --linux --arm64",
```

AppImage运行需要授予权限，授权有2种方式，

1、<font style="color:rgb(64, 64, 64);">界面安装、右键点击文件，选择 “Properties” > “Permissions”, 勾选 “Allow executing file as program</font>

**<font style="color:#117CEE;">Ubuntu，centOS</font>**

![](https://cdn.nlark.com/yuque/0/2023/png/1144659/1691067060200-6fec663d-454b-4cf8-b1ad-690338d148a4.png)

![](https://cdn.nlark.com/yuque/0/2023/png/1144659/1691067080657-42a7360b-0ce5-4ba7-83d1-ee71282197a6.png)

**<font style="color:#117CEE;">麒麟系统（银河麒麟- kylinV10）</font>**

![](https://cdn.nlark.com/yuque/0/2023/png/1144659/1691130376934-b25fe6c7-9f2c-43c5-a53e-b0da1a71c91f.png)

2、可以通过命令行授权

chmod 777 ./xxx.AppImage

### 5、删除软件
```plain
查询全部软件
dpkg --list
删除软件
sudo apt-get --purge remove <programname>
```

## 3、electron-builder编译配置
> 除了直接配置在package.json以外，还可以单独编写配置文件
>

在electron项目根目录新建 electron-builder.yml配置文件

![](https://cdn.nlark.com/yuque/0/2023/png/1144659/1695173369226-b422574e-b8ba-4431-8825-d77a2dca321f.png)

以下是本项目设置的配置

```plain
#electron-builder配置文件

# 不继承其他任何配置（不配置打包会报错）
extends: null
# 构建配置
appId: com.electron.basic.client
productName: electron基础模板
directories:
  # 指定构建输出目录
  output: release

asar: true

# Windows 特定配置
win:
  icon: "static/icons/favicon.ico"
  target:
    - "nsis"
    - "zip"
  requestedExecutionLevel: "requireAdministrator"

# Linux 特定配置
linux:
  target: AppImage
  category: Government Affairs

# 构建时需要包含的文件（这些文件会被打进安装包中，适用于需要操作 文件/文件路径的场景）
files:
  - "build/**/*"
  - "main.js"
  - "preload.js"

# 额外的资源目录
extraResources:
  - from: "./extraResources/**"
    to: "."

# NSIS 安装程序配置（仅适用于 Windows）
nsis:
  include: "scripts/installer.nsi"
  oneClick: false
  perMachine: true
  menuCategory: false
  allowElevation: true
  allowToChangeInstallationDirectory: true
  createDesktopShortcut: true
  installerIcon: "static/icons/favicon.ico"
  uninstallerIcon: "static/icons/favicon.ico"
  installerHeaderIcon: "static/icons/favicon.ico"

# 自动更新配置
publish:
  provider: generic
  url: "https://www.cjkwb.cn/map/client"



```

## 4、electron-packager
### 1、安装
```plain
npm install electron-packager --save-dev
```

### 2、配置
> ./ 代表在当前根目录操作
>
> electron-start 是app名字
>
> --out 导出
>
> ./outApp 导出的路径是根目录，在根目录下新建一个 outApp 文件夹，导出的包和资源在此文件夹下
>

```plain
在package.json的scripts 属性里增加 package 命令
"package": "electron-packager ./ electron-start --out ./outApp",
```

### 3、打包
```plain
npm run package
```

![](https://cdn.nlark.com/yuque/0/2022/png/1144659/1651890901248-6a191415-3f54-4bec-aad9-676cf37d69bc.png)