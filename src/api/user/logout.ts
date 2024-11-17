export default OnRouter(
  ctx => {
    ctx.cookies.set('token', null)
    ctx.status = 200 // 200 OK 状态码
    ctx.body = { message: '登出成功' }
  },
  {
    method: 'get',
    jwt: true
  }
)
