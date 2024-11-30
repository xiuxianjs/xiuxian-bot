import { Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { showUserMsg } from '@xiuxian/api/index'
import { Skills, Equipment } from '@xiuxian/core/index'
export default OnResponse(
  async e => {
    const UID = await getEmailUID(e.UserId)
    const UserData = e['UserData']
    Promise.all([
      Skills.updataEfficiency(UID, UserData.talent),
      Equipment.updatePanel(UID, UserData.battle_blood_now),
      showUserMsg(e)
    ]).catch(err => {
      console.error(err)
      const Send = useSend(e)
      Send(Text('数据处理错误'))
    })

    return
  },
  'message.create',
  /^(#|\/)我的资料$/
)
