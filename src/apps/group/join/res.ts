import { operationLock } from '@xiuxian/core/index'
import { Text, useParse, useSend } from 'alemonjs'
import { user_group, user_group_list } from '@src/xiuxian/db'
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

    const groupList = await user_group_list.findOneValue({
      where: {
        uid: UID
      }
    })

    if (groupList) {
      Send(Text('已有归属队伍'))
      return
    }

    const text = useParse(e.Megs, 'Text')
    const p = text.replace(/^(#|\/)?加入队伍/, '')
    const id = p == '' ? 1 : Number(p)
    const group = await user_group.findOneValue({
      where: {
        id: id
      }
    })

    if (!group) {
      Send(Text('未知队伍'))
      return
    }

    const groupListCount = await user_group_list.count({
      where: {
        gid: group.id
      }
    })

    if (groupListCount >= 4) {
      Send(Text('队伍已满'))
      return
    }

    user_group_list.create({
      gid: group.id,
      uid: UID
    })

    //
    Send(Text('加入成功'))

    //
  },
  'message.create',
  /^(#|\/)加入队伍\d+$/
)
