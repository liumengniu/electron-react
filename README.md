## 开发流程

### 开发阶段

```
开发环境
先 npm run build:test:web
再 npm run build

正式环境
先 npm run build:web
再 npm run build

启动测试环境： npm run start:web
启动开发环境： npm run start 可以进行调试

electron-builder 安装失败--需要设置淘宝镜像
npm config set electron_mirror = "https://npm.taobao.org/mirrors/electron/"
```

## 生产部署流程

### 1 更新内嵌web端 check-list
```
1、检查环境配置文件（包括基础请求/存储地址）
2、jenkins 编译部署web生产包
```
### 2 更新windows桌面端 check-list
```
1、检查环境配置文件（包括基础请求/存储地址）
2、jenkins 编译部署web生产包
3、main.js的 loadURL需要改成web端远程地址
4、修改依赖表（package.json）的版本号，改为最新版本（比之前的版本要高）
5、打包编译生产端，然后将自动更新所需要的文件（exe,block.map,yml）上传至自动更新源目录地址
```

### 3 更新麒麟桌面端 check-list（需要使用虚拟机打包）
```
1、检查环境配置文件（包括基础请求/存储地址）
2、jenkins 编译部署web生产包 npm run build:web
3、main.js的 loadURL需要改成web端远程地址
4、修改依赖表（package.json）的版本号，改为最新版本（比之前的版本要高）
5、打包编译生产端，编译命令 npm run build:appimage:arm64 （需要Linux环境，虚拟机真机都可以），然后将自动更新所需要的文件（xxx-arm64.AppImage,latest-linux-arm64.yml）上传至自动更新源目录地址(首次则不需要)
PS：有时候某些墙外依赖下载需要多尝试几次
```

### 4 更新linux桌面端 check-list（客户暂时没有使用linux桌面系统，可不编译生产）
```
1、检查环境配置文件（包括基础请求/存储地址）
2、jenkins 编译部署web生产包
3、main.js的 loadURL需要改成web端远程地址
4、修改依赖表（package.json）的版本号，改为最新版本（比之前的版本要高）
5、打包编译生产端，编译命令 build:linux （需要Linux环境，虚拟机真机都可以），然后将自动更新所需要的文件（xxx.AppImage,latest-linux.yml）上传至自动更新源目录地址(首次则不需要)
PS：有时候某些墙外依赖下载需要多尝试几次
```
