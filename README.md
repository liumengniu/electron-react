## 1、项目结构

```
├── electron-react         # 桌面应用
├── build                  # web包编译后资源目录
├── extraResources         # 视窗额外打包文件（比如各种执行的cmd/py脚本）
├── public                 # web包编译前资源目录
├── release                # 视窗编译输出目录
├── scripts                # 视窗安装/卸载脚本目录（包括nsis脚本等）
├── src                    # web前端代码目录
│   ├── main/                 # 视窗主进程相关
│   ├── renderer/             # 视窗渲染进程相关
│   │   ├── entry/               # web项目根目录（比如根节点root入口文件）
│   │   ├── components/          # 公共组件目录
│   │   ├── configs/             # 全局配置目录
│   │   ├── i18n/                # 国际化（暂时没用上）
│   │   ├── layout/              # 布局文件目录
│   │   ├── models/              # 数据处理目录
│   │   ├── utils/               # 工具类目录
│   │   ├── redux/               # 状态管理目录
│   │   ├── routers/             # 路由配置目录
│   │   ├── services/            # 请求服务目录 
│   │   ├── statics/             # 静态资源目录 
│   │   ├── tests/               # e2e测试目录 
│   │   ├── mock/                # 模拟数据目录   
│   │   └── views/               # UI界面目录       
│   ├── utils/                # 公共工具类
├── env                    # 开发环境配置（权限最高，勿动）
├── env.development        # 开发环境配置
├── env.production         # 生产环境配置
├── env.test               # 测试环境配置
├── static                 # 桌面应用静态资源
├── .gitignore             # git忽略配置
├── craco.config.js        # webpack配置
├── electron-builder.yml   # electron生产编译配置
├── package.json           # 依赖表
└── webstorm.config        # webstorm配置
```

## 2、开发流程

### 开发阶段

```
开发环境
npm run start

编译生产环境
npm run build

编译测试or仿真环境 
npm run build:test


```

## 3、生产部署流程

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

## 5、其他问题

```
1、electron  安装失败--需要设置镜像
npm config set electron_mirror = "https://npmmirror.com/mirrors/electron/"

2、wait-on 环境问题
Node.js 16, 20 or 21 都没有问题，
Node.js 18 需要监听 127.0.0.1来代替localhost

3、自动更新问题
远程地址上传.exe文件和 latest.yml即可自动更新
上传exe.blockmap可以加速

```

## 🌟 Star History

<br>

[![Star History Chart](https://api.star-history.com/svg?repos=liumengniu/electron-react&type=Timeline)](https://api.star-history.com/svg?repos=liumengniu/electron-react&type=Timeline)