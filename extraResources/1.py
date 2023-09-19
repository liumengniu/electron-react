#!/usr/bin/env python
# -*- encoding: utf-8 -*-

"""
@file:jg.py
@author: cgw
"""
import sys
sys.path.append('..')
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from eth_crawler_config import *


log = dconfig.get_log(os.path.basename(__file__).split('.')[0])


def start_browser():
    opt = webdriver.ChromeOptions()

    # # 解决DevToolsActivePort文件不存在的报错
    opt.add_argument('--no-sandbox')
    # 浏览器不提供可视化页面
    # opt.add_argument('--headless') # 浏览器不提供可视化页面,服务器上运行时需要取消注释，windows调试时加上注释
    opt.add_argument('lang="zh-CN,zh;q=0.9"')
    opt.add_argument("--window-size=1920,1080")
    opt.add_argument('ignore-certificate-errors')
    opt.add_argument("--start-maximized")
    opt.add_argument('user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36"')

    browser = webdriver.Chrome(options=opt, executable_path=ProductionConfig.get_disklist()+'//chromedriver.exe')
    browser.implicitly_wait(10)

    return browser


def login_browser(browser):
    login_ok = False
    time.sleep(1)
    try:
        browser.get('http://218.76.24.86:8080')
        browser.implicitly_wait(5)
         # 获取账密
        args=sys.argv[1]
        data=args.split(',')

        if len(data)<2:
            log.error("请确认输入了账号密码！！！")
            return
        elif len(data[0])==0:
            log.error("账号为空！！！")
            return
        elif len(data[1])==0:
            log.error("密码为空！！！")
            return
        log.info("account:"+data[0]+"password:"+data[1])

        # 切换密码登录
        browser.implicitly_wait(5)
        browser.find_element(By.XPATH,'//input[@name="j_username"]').send_keys(data[0])
        # 输入密码
        browser.implicitly_wait(5)
        browser.find_element(By.XPATH,'//input[@name="j_password"]').send_keys(data[1])
        browser.implicitly_wait(5)
        browser.find_element(By.XPATH,'//a[@name="loginButton"]').click()
        login_ok = True
    except NoSuchElementException:
        log.error("登录出错,未找到元素")
    except BaseException as e:
        log.error(e)
        log.error("登录出错，其它因素")

    time.sleep(5)
    return login_ok

    
def get_dept_list(browser):
        row=browser.find_elements(By.TAG_NAME,'tr')
        j=row[1].find_elements(By.TAG_NAME,'td')
        text=j[6].text
        return text.split("：  ")[1]



def wait_to(hour1):
    while True:
        # 每隔20分钟获取一次时间
        time.sleep(20*60)
        hour2 = int(time.strftime("%M",time.localtime(time.time())))
        if hour1 == hour2:
            return


def tcy_company():
    # count =0
    # while True:
    #     count =count+1
        # 启动浏览器
        browser = start_browser()
        # 登录浏览器，输入账户密码，进入滑动验证界面
        login_ok = login_browser(browser)
        # if login_ok == True:
        #     log.info("登录失败")
        #     browser.close()
            # 等待约1-3小时进行下次尝试
        wait_to(int(time.strftime("%H", time.localtime(time.time()))) + 9)
        # elif count==1:
        #     break
        browser.close()
        
tcy_company()