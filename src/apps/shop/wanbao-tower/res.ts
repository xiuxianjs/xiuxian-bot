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
    if (!(await controlByName(e, UserData, '万宝楼'))) return
    const start_msg = ['___[万宝楼]___', '欢迎光顾本店']
    const text = useParse(e.Megs, 'Text')
    const type = text.replace(/^(#|\/)?(万宝楼|萬寶樓)/, '')
    const commoditiesList = await DB.goods_commodities
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
    const end_msg = GameApi.Goods.getListMsg(
      commoditiesList,
      '灵石',
      GameApi.Cooling.ExchangeStart
    )
    const Send = useSend(e)
    Send(Text(start_msg.concat(end_msg).join('\n')))
    return
  },
  'message.create',
  /^(#|\/)?(万宝楼|萬寶樓)(武器|护具|法宝|丹药|功法|道具|材料|装备)?$/
)