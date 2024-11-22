import { users_email } from '@src/xiuxian/db'
export default OnRouter(
  async ctx => {
    const { username, password } = ctx.request.body as {
      username: string
      password: string
    }
    if (username == '' || password == '') {
      ctx.status = 401
      ctx.body = { message: 'Invalid username' }
      return
    }
    const data = await users_email.findOneValue({
      where: {
        email: username,
        password: password
      }
    })
    if (!data) {
      ctx.status = 401
      ctx.body = { message: 'password error' }
      return
    }
    // 不能存储重要信息
    data.password = null
    // 存在cookie中
    setTokenCookie(ctx, { data })
    // 状态
    ctx.status = 200
    ctx.body = {
      message: '完成'
    }
  },
  {
    method: 'post'
  }
)
