import { Image, Text, useSend } from 'alemonjs'
import { goods } from '@xiuxian/db/index'
import Xiuxian, { useCurrent, selects } from '@src/apps/index'
import { renderComponentToBuffer } from 'jsxp'
import GoodMessage from '@src/xiuxian/img/src/views/GoodMessage'
export const regular = /^(#|\/)?查询物品[\u4e00-\u9fa5]+/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    // 获取用户信息
    const UserData = useCurrent(e).UserData

    // 获取消息内容
    const text = e.MessageText
    if (!text) return

    // 获取物品名称
    const name = text.replace(/^(#|\/)?查询物品/, '').trim()
    const Send = useSend(e)

    // 查询物品信息
    goods
      .findOneValue({ where: { name } })
      .then(async res => {
        if (!res) {
          Send(Text('未找到该物品'))
          return
        }
        // 返回物品信息
        const img = await renderComponentToBuffer(
          'GoodMessage/' + res.id,
          GoodMessage,
          {
            data: res,
            theme: UserData.theme
          }
        )
        if (Buffer.isBuffer(img)) {
          Send(Image(img))
        } else {
          Send(Text('截图错误'))
        }
      })
      .catch(err => {
        console.error(err)
        Send(Text('未找到该物品'))
      })
  }
])
