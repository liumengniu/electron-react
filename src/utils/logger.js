/**
 * description： 桌面端端日志
 * @author Kevin
 * @date 2023/9/20
 */

import {app, remote}  from 'electron'
import logger from "electron-log"

logger.transports.file.level = 'debug';
logger.transports.file.maxSize = 1024 * 10;     //10m
logger.transports.file.format = '[{y}-{m}-{d} {h}-{i}-{s}-{ms}] [{level}]{scope} {text}'
let date = new Date();
let time = date.getFullYear() + '-' + (date.getMonth() +1) + '-' + date.getDate();
logger.transports.file.file = remote.app.getPath('userData') + '\\electron_log\\app\\' + time + '.log';

export default {
	info(param){
		logger.info(param);
	},
	warn(param){
		logger.warn(param);
	},
	error(param){
		logger.error(param);
	},
	debug(param){
		logger.debug(param);
	},
	verbose(param){
		logger.verbose(param);
	},
	silly(param){
		logger.silly(param);
	}
}
