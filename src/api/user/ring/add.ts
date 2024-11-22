import { Ring } from '@src/xiuxian/core'
import { Attributes, users_email } from '@src/xiuxian/db'
export default OnRouter(
  async ctx => {
    const db = ctx.state['user'] as Attributes<typeof users_email>
    if (db.identity > 3) {
      ctx.status = 404
      ctx.body = { message: '权限不足' }
      return
    }
    const query = ctx.query as {
      uid: string
      items: string
    }
    if (!query?.uid || !query?.items) {
      ctx.status = 400
      ctx.body = { message: '未提供id' }
      return
    }
    let items: {
      name: string
      acount: number
    }[] = null
    try {
      items = JSON.parse(query.items) as {
        name: string
        acount: number
      }[]
    } catch (err) {
      console.error(err)
    }
    if (!items || !Array.isArray(items)) {
      ctx.status = 400
      ctx.body = { message: 'items参数格式不正确' }
      return
    }
    try {
      Ring.addRingThing(query.uid, items)
      ctx.status = 200 // 200 OK
      ctx.body = { message: '删除完成' }
    } catch (error) {
      console.error('数据库查询失败:', error)
      ctx.status = 500 // Internal Server Error
      ctx.body = { message: '获取数据失败，请稍后重试' }
    }
  },
  {
    method: 'post',
    jwt: true
  }
)
