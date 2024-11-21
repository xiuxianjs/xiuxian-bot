import { Bag } from '@src/xiuxian/core'
import { Attributes, goods, user, users_email } from '@src/xiuxian/db'
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
      name: string
      count: string
    }
    const { uid: UID, name: Name, count: Count } = query

    const UserData = await user.findOneValue({
      where: {
        uid: UID
      }
    })
    if (!UserData) {
      ctx.status = 404
      ctx.body = {
        message: '用户不存在'
      }
    }
    // 查阅物品
    const ifexist = await goods.findOneValue({
      where: {
        name: Name // 找到物品名
      }
    })
    // 物品不存在
    if (!ifexist) {
      ctx.status = 404
      ctx.body = {
        message: '该物品不存在'
      }
      return
    }
    //
    const BagSize = await Bag.backpackFull(UID)
    if (!BagSize) {
      ctx.status = 404
      ctx.body = {
        message: '储物袋空间不足'
      }
      return
    }
    const acount = Number(Count)
    await Bag.addBagThing(UID, [
      {
        name: ifexist.name,
        acount: acount < 1 ? 1 : acount
      }
    ])
    ctx.body = { message: `已添加[${Name}]*${Count}` }
  },
  {
    method: 'post',
    jwt: true
  }
)
