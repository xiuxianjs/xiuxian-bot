import { Text, useSend } from 'alemonjs'
import { isSideUser } from '@xiuxian/api/index'
import { Bag } from '@xiuxian/core/index'
import { goods } from '@xiuxian/db/index'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
export default OnResponse(async (e, next) => {
  if (!/^(#|\/)天道裁决/.test(e.MessageText)) {
    next()
    return
  }
  if (!e.IsMaster) return
  const text = e.MessageText
  if (!text) return
  const [uid, Name, Count] = text.replace(/(#|\/)天道裁决/, '').split('*')
  const UID = await getEmailUID(uid)
  const UserData = await isSideUser(e, UID)
  if (typeof UserData == 'boolean') return
  // 查阅物品
  const ifexist = await goods.findOneValue({
    where: {
      name: Name // 找到物品名
    }
  })
  const Send = useSend(e)
  // 物品不存在
  if (!ifexist) {
    Send(Text(`未找到[${Name}]`))
    return
  }
  //
  const BagSize = await Bag.backpackFull(UID)
  if (!BagSize) {
    // 储物袋空间不足
    Send(Text(`储物袋空间不足`))
    return
  }
  const acount = Number(Count)
  await Bag.addBagThing(UID, [
    {
      name: ifexist.name,
      acount: acount < 1 ? 1 : acount
    }
  ])
  Send(Text(`已添加[${Name}]*${Count}`))
  return
}, 'message.create')
