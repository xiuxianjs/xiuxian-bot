import { operationLock } from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'
import { Attributes, user_group, user_group_list } from '@src/xiuxian/db'
import Xiuxian, { selects } from '@src/apps/index'
export const regular = /^(#|\/)?(开启|关闭)队伍$/
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
    if (group.uid == UID) {
      const text = e.MessageText
      if (/关闭/.test(text)) {
        user_group.update(
          {
            lock: 0
          },
          {
            where: {
              id: group.id
            }
          }
        )
        Send(Text('已锁定队伍'))
      } else {
        user_group.update(
          {
            lock: 1
          },
          {
            where: {
              id: group.id
            }
          }
        )
        Send(Text('已开放队伍'))
      }
    } else {
      Send(Text('没有队长权限'))
    }
  }
])
