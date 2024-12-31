import { Text, useSend } from 'alemonjs'
import { operationLock } from '@xiuxian/core/index'
import { user_group } from '@src/xiuxian/db'
import { platform as telegram } from '@alemonjs/telegram'
import { platform as wechat } from '@alemonjs/wechat'
export default OnResponse(
  async (e, next) => {
    if (e.Platform == telegram || e.Platform == wechat) {
      // 暂时不支持
      next()
      return
    }
    if (!/^(#|\/)查看队伍(\d+)?$/.test(e.MessageText)) {
      next()
      return
    }
    const TT = await operationLock(e.UserKey)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }
    const text = e.MessageText
    const p = text.replace(/^(#|\/)查看队伍/, '')
    //
    const page = p == '' ? 1 : Number(p)
    const pageSize = 10
    const totalCount = await user_group.count()
    const totalPages = Math.ceil(totalCount / pageSize)
    if (page > totalPages) {
      Send(Text('该栏暂无队伍'))
      return
    }
    const limit = pageSize
    const offset = (page - 1) * pageSize
    const group = await user_group.findAllValues({
      limit: limit,
      offset: offset
    })
    const msg = group.map(item => `[${item.id}]${item.name}`)
    Send(Text(msg.join('\n')))
    return
  },
  ['message.create', 'private.message.create']
)
