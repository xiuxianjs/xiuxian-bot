export default OnRouter(
  async ctx => {
    updateTokenCookie(ctx)
    ctx.body = { message: 'Token 刷新成功' }
  },
  {
    jwt: true
  }
)
