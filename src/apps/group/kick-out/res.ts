import { operationLock } from '@xiuxian/core/index'
import { Text, useParse, useSend } from 'alemonjs'
import { Attributes, user_group, user_group_list } from '@src/xiuxian/db'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
export default OnResponse(
  async e => {
    const TT = await operationLock(e.UserId)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = await getEmailUID(e.UserId)

    const myGroupList = user_group_list
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
    if (group.leader != UID) {
      Send(Text('不是队长'))
      return
    }

    const ats = useParse(e.Megs, 'At')
    let UIDB = null
    if (!ats || ats.length === 0) {
      const text = useParse(e.Megs, 'Text')
      UIDB = text.replace(/^(#|\/)?踢出/, '')
    } else {
      const d = ats.find(item => item?.typing === 'user' && !item.bot)
      UIDB = d?.value
    }
    //
    if (!UIDB) {
      Send(Text('未正确获取对方UID'))
      return
    }

    if (UIDB == UID) {
      return
    }

    user_group_list.destroy({
      where: {
        uid: UIDB
      }
    })

    Send(Text('成功踢出'))

    return
  },
  'message.create',
  /^(#|\/)踢出/
)
