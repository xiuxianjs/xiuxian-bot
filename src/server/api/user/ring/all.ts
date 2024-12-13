import { Attributes, user_ring, users_email } from '@src/xiuxian/db'
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
      page: string
      limit: string
      typing: string
    }
    if (!query?.uid) {
      ctx.status = 400
      ctx.body = { message: '未提供uid' }
      return
    }
    // 获取请求的分页参数
    const typing = parseInt(query.typing) || 1 // 默认第1页
    const page = parseInt(query.page) || 1 // 默认第1页
    const limit = parseInt(query.limit) || 10 // 默认每页10条
    try {
      // 分页查询
      const data = await user_ring.findAllValues({
        where: {
          uid: query.uid,
          type: typing
        },
        offset: (page - 1) * limit,
        limit
      })
      ctx.status = 200 // 200 OK
      ctx.body = { message: '获取成功', data }
    } catch (error) {
      console.error('数据库查询失败:', error)
      ctx.status = 500 // Internal Server Error
      ctx.body = { message: '获取数据失败，请稍后重试' }
    }
  },
  {
    jwt: true
  }
)
