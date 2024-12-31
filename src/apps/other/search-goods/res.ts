import { Image, Text, useSend } from 'alemonjs'
import { Attributes, goods, user } from '@xiuxian/db/index'
import { pictureRender } from '@xiuxian/img/index'
import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)查询物品[\u4e00-\u9fa5]+/.test(e.MessageText)) {
      next()
      return
    }
    // 获取用户信息
    const UserData = e['UserData'] as Attributes<typeof user>

    // 获取消息内容
    const text = e.MessageText
    if (!text) return

    // 获取物品名称
    const name = text.replace(/^(#|\/)查询物品/, '').trim()
    const Send = useSend(e)

    // 查询物品信息
    goods
      .findOne({ where: { name } })
      .then(res => res?.dataValues)
      .then(async res => {
        if (!res) {
          Send(Text('未找到该物品'))
          return
        }
        // 返回物品信息
        const img = await pictureRender('GoodMessage', {
          data: res,
          theme: UserData.theme
        })
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
  },
  ['message.create', 'private.message.create']
)
