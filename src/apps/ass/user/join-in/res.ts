import { Text, useParse, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { isUser } from '@xiuxian/api/index'
import * as GameApi from '@xiuxian/core/index'
import * as DB from '@xiuxian/db/index'
export default OnResponse(
  async e => {
    const UID = await getEmailUID(e.UserId)
    const UserData = await isUser(e, UID)
    if (typeof UserData === 'boolean') return

    // 查看自己的势力
    const UserAss = await DB.user_ass
      .findAll({
        where: {
          uid: UID
        }
      })
      .then(res => res.map(item => item.dataValues))

    //
    const Send = useSend(e)

    // 发现自己的势力
    if (
      UserAss.length != 0 &&
      UserAss.find(
        item => item.identity == GameApi.Config.ASS_IDENTITY_MAP['0']
      )
    ) {
      Send(Text('已创立个人势力'))
      return
    }

    // 查看申请表
    const ApplyData = await DB.user_ass_apply
      .findAll({
        where: {
          uid: UID
        }
      })
      .then(res => res.map(item => item.dataValues))

    if (UserAss.length + ApplyData.length >= 3) {
      Send(Text(`最多还能申请${3 - (UserAss.length + ApplyData.length)}个势力`))
      return
    }

    const text = useParse(e.Megs, 'Text')
    const name = text.replace(/^(#|\/)?加入/, '')

    // 存在该昵称的宗门
    const aData = await DB.ass
      .findOne({
        where: {
          name: name
        }
      })
      .then(res => res?.dataValues)

    //
    if (!aData) {
      Send(Text('该势力不存在'))
      return
    }

    //
    if (UserAss.length != 0 && UserAss.find(item => item.aid == aData.id)) {
      Send(Text('已加入该势力'))
      return
    }

    //
    if (ApplyData.length > 3) {
      Send(Text('最多提交三次申请'))
      return
    }

    //
    if (ApplyData.length > 0 && ApplyData.find(item => item.aid == aData.id)) {
      Send(Text('已提交申请'))
      return
    }

    // 创建信息条目
    await DB.user_ass_apply.create({
      uid: UID,
      aid: aData.id
    })

    //
    Send(Text('已提交申请'))

    return
  },
  'message.create',
  /^(#|\/)?加入[\u4e00-\u9fa5]+$/
)