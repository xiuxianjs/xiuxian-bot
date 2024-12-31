export default OnResponse(
  async (e, next) => {
    if (!/^(#|\/)小白[\u4e00-\u9fa5]+$/.test(e.MessageText)) {
      next()
      return
    }
    return
  },
  ['message.create', 'private.message.create']
)
