import { Text, useSend } from 'alemonjs'
import { controlByName } from '@xiuxian/api/index'
import Xiuxian, { useCurrent, selects } from '@src/apps/index'
export const regular = /^(#|\/)?阵法师学徒$/
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    const UserData = useCurrent(e).UserData
    if (!(await controlByName(e, UserData, '协会'))) return
    const Send = useSend(e)
    Send(Text(['[协会执事]😳叶子凡\n', '目前职业阵法师\n'].join('')))
  }
])
