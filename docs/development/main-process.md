# 主进程

主进程主要负责 操作electron和node.js相关api.

## 渲染进程相关

main.js 负责操作 electron和node.js相关api

preload.js 预加载文件，负责进程通信，包括单向通信和双向通信，并且 webview和 browserView 和其他进程通信也通过 预加载文件
