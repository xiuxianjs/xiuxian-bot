import { Image, Text, useSend } from 'alemonjs'
import { Cooling } from '@xiuxian/core/index'
import { ass } from '@xiuxian/db/index'
import Xiuxian, { selects, useCurrent } from '@src/apps/index'
import { renderComponentToBuffer } from 'jsxp'
import AssList from '@src/xiuxian/img/src/views/AssList'
export const regular = /^(#|\/)?查看势力(\d+)?$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UserData = useCurrent(e).UserData
    const text = e.MessageText
    const p = text.replace(/^(#|\/)?查看势力/, '')
    const page = p == '' ? 1 : Number(p)
    //
    const pageSize = Cooling.pageSize
    // 长度
    const totalCount = await ass.count()
    //
    const totalPages = Math.ceil(totalCount / pageSize)
    if (page > totalPages) return

    const Send = useSend(e)

    const limit = pageSize
    const offset = (page - 1) * pageSize

    // 宗门数据
    ass
      .findAllValues({
        limit: limit,
        offset: offset
      })
      .then(async res => {
        if (res.length === 0) {
          Send(Text('没有找到数据'))
          return
        }
        // 宗门信息
        const img = await renderComponentToBuffer('AssList', AssList, {
          data: res,
          theme: UserData.theme
        })
        //
        if (Buffer.isBuffer(img)) {
          Send(Image(img))
        } else {
          Send(Text('截图错误'))
        }
      })
    return
  }
])
