import { Text, useParse, useSend } from 'alemonjs'
import { operationLock } from '@xiuxian/core/index'
import { user_group } from '@src/xiuxian/db'
export default OnResponse(
  async e => {
    const TT = await operationLock(e.UserId)
    const Send = useSend(e)
    if (!TT) {
      Send(Text('操作频繁'))
      return
    }
    const text = useParse(e.Megs, 'Text')
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
  'message.create',
  /^(#|\/)查看队伍(\d+)?$/
)