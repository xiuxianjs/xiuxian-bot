import { Attributes, user_group, user_group_list } from '@src/xiuxian/db'
import { operationLock } from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'
import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)查看秘境$/.test(e.MessageText)) {
      next()
      return
    }
    const TT = await operationLock(e.UserKey)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = e.UserKey

    const myGroupList = await user_group_list
      .findOne({
        where: {
          uid: UID
        },
        include: [
          {
            model: user_group
          }
        ]
      })
      .then(res => res?.dataValues)

    //
    if (!myGroupList) {
      Send(Text('未加入任何队伍'))
      return
    }

    //
    const group = myGroupList['user_group']['dataValues'] as Attributes<
      typeof user_group
    >

    // 自己就是队长，触发解散
    if (group.uid != UID) {
      Send(Text('不是队长'))
      return
    }

    Send(Text('待更新'))

    return
  },
  ['message.create', 'private.message.create']
)
