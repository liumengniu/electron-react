/**
 * 描述： 全局状态 store 配置
 * @author Kevin
 * @date 2023/9/20
 */

import { applyMiddleware, createStore } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducers from "../reducers"
import appReducer from "../reducers/appReducer"

/**
 * 中间件的集合
 * @type {*[]}
 */
const middlewares = []
const sagaMiddleware = createSagaMiddleware()

if (process.env.NODE_ENV === "development") {
	const { logger } = require(`redux-logger`)
	middlewares.push(logger)
}

middlewares.push(sagaMiddleware)

function configureStore(preloadedState) {
	const middlewareEnhancer = applyMiddleware(...middlewares)
	return createStore(rootReducers, preloadedState, middlewareEnhancer)
}

const appStore = configureStore()

//启动saga 中间件
// sagaMiddleware.run(sagas);

export default appStore
