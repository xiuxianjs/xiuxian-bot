import { user_log } from '@xiuxian/db/index'
import Xiuxian, { selects } from '@src/apps/index'
import { Method } from '@xiuxian/core/index'
import { Text, useSend } from 'alemonjs'
export const regular = /^(#|\/)?我的记录$/

/**
 * tudo
 */
export default onResponse(selects, [
  Xiuxian.current,
  async e => {
    return
    const UID = e.UserKey

    const logsData = await user_log.findAllValues({
      where: {
        uid: UID
      },
      order: [
        ['create_time', 'DESC'] // 降序排列
      ],
      limit: 10
    })

    /**
     * 查询后
     * 顺带把 没查到的数据都删除了
     * 确保只留下最新的10条记录
     */

    user_log
      .findAll({
        where: {
          uid: UID
        },
        order: [
          ['create_time', 'DESC'] // 降序排列
        ]
      })
      .then(res => {
        // 删除多余的记录
        for (const item of res) {
          const find = logsData.find(i => i.id == item.id)
          // 不是前十的记录都删除
          if (!find) {
            user_log.destroy({
              where: {
                id: item.id
              }
            })
          }
        }
      })

    const msg = ['[我的记录]']

    const Send = useSend(e)

    if (logsData.length == 0) {
      Send(Text('未存在任何记录'))

      return
    }

    const map = {
      2: '打劫',
      3: '窃取'
    }

    for (const item of logsData) {
      msg.push(
        `\n[${map[item.type]}][${Method.timeChange(item.create_time)}]${item.message}`
      )
    }

    Send(Text(msg.join('')))
  }
])
