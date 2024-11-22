import { updatePlayer } from '@src/xiuxian/core/src/system/player'
import { Attributes, users_email } from '@src/xiuxian/db'
export default OnRouter(
  async ctx => {
    const db = ctx.state['user'] as Attributes<typeof users_email>
    if (db.identity > 3) {
      ctx.status = 404
      ctx.body = { message: '权限不足' }
      return
    }
    //
    const query = ctx.query as {
      uid: string
    }
    //
    if (!query?.uid) {
      ctx.status = 400
      ctx.body = { message: '未提供uid' }
      return
    }
    // 获取请求的分页参数
    try {
      updatePlayer(query.uid, '')
      // 分页查询
      ctx.status = 200 // 200 OK
      ctx.body = { message: '获取成功' }
    } catch (error) {
      console.error('数据库查询失败:', error)
      ctx.status = 500 // Internal Server Error
      ctx.body = { message: '获取数据失败，请稍后重试' }
    }
  },
  {
    method: 'get',
    jwt: true
  }
)
