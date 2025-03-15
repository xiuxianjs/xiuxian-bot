import { Attributes, user_group, user_group_list } from '@src/xiuxian/db'
import { operationLock } from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'
import { createSelects } from 'alemonjs'
import Xiuxian from '@src/apps/index'
const selects = createSelects(['message.create', 'private.message.create'])

export const regular = /^(#|\/)查看秘境$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
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
  }
])
