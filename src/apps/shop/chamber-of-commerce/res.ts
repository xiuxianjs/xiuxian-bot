import { controlByName, isUser } from '@xiuxian/api/index'
import * as DB from '@xiuxian/db/index'
import * as GameApi from '@xiuxian/core/index'
import { Text, useParse, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
export default OnResponse(
  async e => {
    const UID = await getEmailUID(e.UserId)
    const UserData = await isUser(e, UID)
    if (typeof UserData === 'boolean') return
    if (!(await controlByName(e, UserData, '联盟'))) return
    const start_msg = ['___[联盟商会]___', '[/兑换+物品名*数量]']
    const text = useParse(e.Megs, 'Text')
    const type = text.replace(/^(#|\/)?(联盟商会|聯盟商會)/, '')
    const commoditiesList = await DB.goods_alliancemall
      .findAll({
        include: [
          {
            model: DB.goods,
            where: {
              type: GameApi.Goods.mapType[type] ?? GameApi.Goods.mapType['道具']
            }
          }
        ]
      })
      .then(item => item.map(item => item?.dataValues['good']['dataValues']))
    const Send = useSend(e)
    const end_msg = GameApi.Goods.getListMsg(commoditiesList, '声望')
    Send(Text(start_msg.concat(end_msg).join('\n')))
    return
  },
  'message.create',
  /^(#|\/)?(联盟商会|聯盟商會)(武器|护具|法宝|丹药|功法|道具|材料|装备)?$/
)
