# 渲染进程

使用者可以参考我的项目结构进行微调或者改造.

## 渲染进程相关

```
1、脚手架采用官方cli - create-react-app
2、状态管理工具为redux 的 react适配版 react-redux 和 @reduxjs/toolkit
3、异步工具为 redux-saga
4、数据传递和控制渲染采用 @reduxjs/toolkit 下的 reselect
5、路由采用 react-router-dom
6、样式建议采用 styled-components 和 less
7、开发调试日志采用 redux-logger
8、项目配置采用 craco
9、UI库建议 antd，图表 是 echarts
10、环境变量从 process.env.REACT_APP_ENVIRONMENT 中获取（development - 开发， test - 测试， production - 生产），
    主要是 react 的 NODE_ENV无法像vue一样被脚本覆盖

```