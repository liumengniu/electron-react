# 项目结构

使用者可以参考我的项目结构进行微调或者改造.

## 项目结构
```
├── electron-react         # 桌面应用
├── build                  # web包编译后资源目录
├── extraResources         # 视窗额外打包文件（比如各种执行的cmd/python脚本）
├── public                 # web包编译前资源目录
├── release                # 视窗编译输出目录
├── scripts                # 视窗安装/卸载脚本目录（包括nsis脚本等）
├── src                    # web前端代码目录
│   ├── main/                 # 视窗主进程相关
│   │   ├── main.js              # 主进程代码
│   │   ├── preload.js           # 预加载脚本（进程通信）
│   ├── renderer/             # 视窗渲染进程相关
│   │   ├── entry/               # web项目根目录（比如根节点root入口文件）
│   │   ├── components/          # 公共组件目录
│   │   ├── configs/             # 全局配置目录
│   │   ├── i18n/                # 国际化（暂时没用上）
│   │   ├── layout/              # 布局文件目录
│   │   ├── models/              # 数据处理目录
│   │   ├── utils/               # 工具类目录
│   │   ├── redux/               # 状态机管理目录
│   │   ├── routers/             # 路由配置目录
│   │   ├── api/                 # 请求服务目录 
│   │   ├── statics/             # 渲染进程静态资源目录 
│   │   ├── tests/               # e2e测试目录 
│   │   ├── mock/                # 模拟数据目录   
│   │   └── views/               # UI界面目录       
│   ├── staic/                # 公共资源类
│   ├── utils/                # 公共工具类
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