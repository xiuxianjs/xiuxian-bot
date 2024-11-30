import { Text, useParse, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { Bag, operationLock, order } from '@xiuxian/core/index'
import { user_transactions } from '@xiuxian/db/index'
export default OnResponse(
  async e => {
    const T = await operationLock(e.UserId)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }
    const UID = await getEmailUID(e.UserId)
    //
    const text = useParse(e.Megs, 'Text')
    const id = text.replace(/^(#|\/)下架/, '').trim()
    if (!id || id == '' || isNaN(Number(id))) {
      Send(Text('请输入正确的编号'))
      return
    }

    // 查询物品
    const data = await user_transactions
      .findOne({
        where: {
          uid: UID,
          id: Number(id)
        }
      })
      .then(res => res?.dataValues)

    if (!data) {
      Send(Text('没有找到该物品'))
      return
    }

    // 删除物品
    const Del = await order.delThing(data.id)
    if (!Del) {
      Send(Text('删除失败'))
      return
    }

    // 加物品
    await Bag.addBagThing(UID, [
      {
        name: data.name,
        acount: data.count
      }
    ])
    Send(Text('下架操作完成'))
  },
  'message.create',
  /^(#|\/)下架/
)
