import { Text, useSend } from 'alemonjs'
import * as GameApi from '@xiuxian/core/index'
import * as DB from '@xiuxian/db/index'
import Xiuxian, { selects } from '@src/apps/index'
export const regular = /^(#|\/)?加入[\u4e00-\u9fa5]+$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    // 操作锁
    const TT = await GameApi.operationLock(e.UserKey)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }

    const UID = e.UserKey

    // 查看自己的势力
    const UserAss = await DB.user_ass.findAllValues({
      where: {
        uid: UID
      }
    })

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
    const ApplyData = await DB.user_ass_apply.findAllValues({
      where: {
        uid: UID
      }
    })

    if (UserAss.length + ApplyData.length >= 3) {
      Send(Text(`最多还能申请${3 - (UserAss.length + ApplyData.length)}个势力`))
      return
    }

    const text = e.MessageText
    const name = text.replace(/^(#|\/)?加入/, '')

    // 存在该昵称的宗门
    const aData = await DB.ass.findOneValue({
      where: {
        name: name
      }
    })

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
  }
])
