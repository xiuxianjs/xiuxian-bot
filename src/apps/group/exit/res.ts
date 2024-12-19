import { operationLock, Status } from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'
import { Attributes, user_group, user_group_list } from '@src/xiuxian/db'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
export default OnResponse(async (e, next) => {
  if (!/^(#|\/)(退出队伍|解散队伍)$/.test(e.MessageText)) {
    next()
    return
  }
  const TT = await operationLock(e.UserKey)
  const Send = useSend(e)
  if (!TT) {
    Send(Text('操作频繁'))
    return
  }
  const UID = await getEmailUID(e.UserKey)
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
    // 解除
    await user_group_list
      .findAllValues()
      .then(res =>
        res.map(item => Status.setStatus({ UID: item.uid, key: 'kongxian' }))
      )
    // 删除
    await user_group_list.destroy({
      where: {
        gid: group.id
      }
    })
    // 删除
    user_group.destroy({
      where: {
        id: group.id
      }
    })
    Send(Text('已解散队伍'))
    // 解散要释放所有人。
  } else {
    const text = e.MessageText
    if (/解散队伍/.test(text)) {
      Send(Text('没有队长权限'))
      return
    } else {
      await user_group_list.destroy({
        where: {
          uid: UID
        }
      })
      Send(Text('已退出队伍'))
      Status.setStatus({ UID, key: 'kongxian' })
    }
  }
  // 变为空闲状态
  return
}, 'message.create')
