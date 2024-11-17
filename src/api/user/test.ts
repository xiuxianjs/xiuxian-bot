export default OnRouter(
  async ctx => {
    ctx.body = {
      message: 'hello world'
    }
  },
  {
    method: 'get'
  }
)
