import { operationLock, Status } from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'
import { Attributes, user, user_group, user_group_list } from '@src/xiuxian/db'
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

    const group = await user_group_list.findOneValue({
      where: {
        uid: UID
      }
    })

    if (group) {
      Send(Text('已有归属队伍'))
      return
    }

    const UserData = e['UserData'] as Attributes<typeof user>

    user_group
      .create({
        leader: UID,
        name: `${UserData.name}的队伍`
      })
      .then(res =>
        user_group_list.create({
          gid: res.dataValues.id,
          uid: UID
        })
      )
      .then(() => Status.setStatus({ UID, key: 'zudui' }))
      .then(() => Send(Text(`创建:${UserData.name}的队伍`)))
      .catch(console.error)

    return
  },
  'message.create',
  /^(#|\/)创建队伍$/
)
