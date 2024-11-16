import { Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { showUserMsg, createUser } from '@xiuxian/api/index'
import * as GameApi from '@xiuxian/core/index'
import { user } from '@xiuxian/db/index'
export default OnResponse(
  async e => {
    //
    const UID = await getEmailUID(e.UserId)

    //
    const UserData = await user
      .findOne({
        where: {
          uid: UID
        }
      })
      .then(res => res?.dataValues)
      .catch(err => {
        console.error(err)
        const Send = useSend(e)
        Send(Text('数据处理错误'))
      })

    if (!UserData) {
      createUser(e)
      return
    }

    Promise.all([
      GameApi.Skills.updataEfficiency(UID, UserData.talent),
      GameApi.Equipment.updatePanel(UID, UserData.battle_blood_now),
      showUserMsg(e)
    ]).catch(err => {
      console.error(err)
      const Send = useSend(e)
      Send(Text('数据处理错误'))
    })

    return
  },
  'message.create',
  /^(#|\/)?我的资料$/
)
