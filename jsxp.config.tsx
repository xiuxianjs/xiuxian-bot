/**
 * @description: jsxp配置文件
 * 需要写插入数据
 * 确保图片被正常渲染
 */
import '@src/sql'
import React from 'react'
import { defineConfig } from 'jsxp'
import { Component } from '@xiuxian/img/index'
import json_base_help from '@src/assets/defset/base_help.json'
export default defineConfig({
  routes: {
    '/HelpComponent': {
      component: (
        <Component.HelpComponent theme={'dark'} data={json_base_help} />
      )
    }
  }
})
