import { operationLock, Status } from '@xiuxian/core/index'
import { Text, useMention, useSend } from 'alemonjs'
import { Attributes, user_group, user_group_list } from '@src/xiuxian/db'
import Xiuxian, { selects } from '@src/apps/index'
export const regular = /^(#|\/)?踢出(\d+)?$/
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

    const [mention] = useMention(e)
    let UIDB: string | null = null
    const res = await mention.findOne()
    if (res.code !== 2000) {
      const text = e.MessageText
      const id = text.replace(/^(#|\/)?踢出/, '')
      // 查看标记
      const groupList = await user_group_list.findOneValue({
        where: {
          id: id,
          gid: group.id
        }
      })
      if (!groupList) {
        Send(Text('未找到标记'))
        return
      }
      UIDB = groupList.uid
    } else {
      UIDB = res.data
      const groupList = await user_group_list.findOneValue({
        where: {
          gid: group.id,
          uid: UIDB
        }
      })
      if (!groupList) {
        Send(Text('不在队伍内'))
        return
      }
    }
    if (UIDB == UID) {
      Send(Text('你干嘛,哎哟～'))
      return
    }
    user_group_list.destroy({
      where: {
        uid: UIDB
      }
    })
    Send(Text('成功踢出'))
    Status.setStatus({ UID: UIDB, key: 'kongxian' })

    return
  }
])
