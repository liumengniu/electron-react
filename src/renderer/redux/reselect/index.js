/**
 * 描述：全局数据的 reselect
 * @author Kevin
 * @date 2023/9/20
 */

import { createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import routers from "@/renderer/routers"

//state
const allState = state => state

/**
 * 获取路由
 * @param state
 */
const currentRouter = state => _.get(state, "routerReducer") //获取state的当前路由信息

export {}
