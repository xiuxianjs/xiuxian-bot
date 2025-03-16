import { operationLock } from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'
import { Attributes, user_group, user_group_list } from '@src/xiuxian/db'
import Xiuxian, { selects } from '@src/apps/index'
export const regular = /^(#|\/)我的队伍$/
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
    if (!myGroupList) {
      Send(Text('未加入任何队伍'))
      return
    }
    const group = myGroupList['user_group']['dataValues'] as Attributes<
      typeof user_group
    >
    const groupList = await user_group_list.findAllValues({
      where: {
        gid: group.id
      }
    })
    const msg = [`[${group.id}][${group.name}]`].concat(
      groupList.map(item => `标记:${item.id}_队友:${item.uid}`)
    )
    Send(Text(msg.join('\n')))
    return
  }
])
