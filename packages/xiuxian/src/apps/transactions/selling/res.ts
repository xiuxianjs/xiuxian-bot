import { Image, Text, useSend } from 'alemonjs'
import { operationLock } from '@xiuxian/core/index'
import { user_transactions } from '@xiuxian/db/index'
import Xiuxian, { useCurrent, selects } from '@src/apps/index'
import { renderComponentToBuffer } from 'jsxp'
import TransactionMessage from '@src/xiuxian/img/src/views/TransactionMessage'
export const regular = /^(#|\/)?我的虚空镜$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const T = await operationLock(e.UserKey)
    const Send = useSend(e)
    if (!T) {
      Send(Text('操作频繁'))
      return
    }
    //
    const UID = e.UserKey
    const UserData = useCurrent(e).UserData
    user_transactions
      .findAllValues({
        where: {
          uid: UID
        }
      })
      .then(async res => {
        if (res.length === 0) {
          Send(Text('没有找到数据'))
          return
        }

        // 返回物品信息
        const img = await renderComponentToBuffer(
          'TransactionMessage',
          TransactionMessage,
          {
            data: {
              page: 1,
              goods: res
            },
            theme: UserData.theme
          }
        )

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
  }
])
