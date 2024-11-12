import { Image, Text, useSend } from 'alemonjs'
import { getEmailUID } from '@src/xiuxian/core/src/system/email'
import { isUser } from '@xiuxian/api/index'
import { operationLock } from '@xiuxian/core/index'
import { transactions } from '@xiuxian/db/index'
import { pictureRender } from '@xiuxian/img/index'
export default OnResponse(
  async e => {
    const T = await operationLock(e.UserId)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }
    //
    const UID = await getEmailUID(e.UserId)
    const UserData = await isUser(e, UID)
    if (typeof UserData === 'boolean') return
    transactions
      .findAll({
        where: {
          uid: UID
        }
      })
      .then(res => res.map(item => item?.dataValues))
      .then(async res => {
        if (res.length === 0) {
          Send(Text('没有找到数据'))
          return
        }

        // 返回物品信息
        const img = await pictureRender('TransactionMessage', {
          data: {
            page: 1,
            goods: res
          },
          theme: UserData.theme
        })

        //
        if (Buffer.isBuffer(img)) {
          Send(Image(img))
        } else {
          Send(Text('截图错误'))
        }
      })
      .catch(err => {
        console.error(err)
        Send(Text('数据错误'))
      })
  },
  'message.create',
  /^(#|\/)?我的虚空镜$/
)
