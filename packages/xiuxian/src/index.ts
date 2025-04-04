export default defineChildren(() => ({
  async onCreated() {
    console.info('修仙机器人开启')
    await import('./sql')
  },
  // onMounted(data) {
  //   console.log(data)
  // }
  unMounted(err) {
    console.info('修仙机器人关闭', err)
  }
}))
