import { defineChildren, getConfig } from 'alemonjs'
import {} from 'chat-space'
import axios from 'axios'

class DCAPI {
  API_URL = 'https://discord.com/api/v10'
  CDB_URL = 'https://cdn.discordapp.com'
  /**
   * 基础请求
   * @param opstion
   * @returns
   */
  request(options) {
    const cfg = getConfig()
    const v = cfg.value?.discord
    const token = v.token
    const service = axios.create({
      baseURL: this.API_URL,
      timeout: 6000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bot ${token}`
      }
    })
    return service(options)
  }
  commands() {
    const cfg = getConfig()
    const v = cfg.value?.discord
    return this.request({
      method: 'post',
      url: `/applications/${v.id}/commands`,
      data: {
        name: '储物袋',
        description: '查看储物袋',
        options: [
          {
            name: '武器',
            description: '武器',
            type: 2,
            value: '/储物袋武器'
          },
          {
            name: '丹药',
            description: '丹药',
            type: 2,
            value: '/储物袋丹药'
          },
          {
            name: '道具',
            description: '道具',
            type: 2,
            value: '/储物袋道具'
          }
        ]
      }
    })
  }
}

export default defineChildren(() => {
  return {
    onCreated() {
      // 整个模块被识别时
      console.log('修仙机器人启动')
      if (process.argv.includes('discord')) {
        const Client = new DCAPI()
        Client.commands().catch(console.error)
      }
    }
  }
})
