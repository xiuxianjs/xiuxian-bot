import { Text, useSend } from 'alemonjs'

import { Bag, Method, operationLock } from '@xiuxian/core/index'
import { Attributes, user } from '@xiuxian/db/index'
const MoenySize = 10
import Xiuxian from '@src/apps/index'

export const regular = /^(#|\/)(联盟签到|聯盟簽到)$/
export default OnResponse(
  [
    Xiuxian.current,
    async e => {
      const TT = await operationLock(e.UserKey)
      const Send = useSend(e)
      if (!TT) {
        Send(Text('操作频繁'))
        return
      }

      const UID = e.UserKey
      const UserData = e['UserData'] as Attributes<typeof user>
      //
      const time = new Date()
      let size = 0

      if (UserData.sign_in_time) {
        if (Method.isSameDay(UserData.sign_in_time, time)) {
          Send(Text('今日已签到'))
          return
        }
        if (Method.isSameYearAndMonth(UserData.sign_in_time, time)) {
          size = 0
          // 更新 + 1
          await user.update(
            {
              sign_in_count: UserData.sign_in_count + 1,
              sign_in_month_count: 0,
              sign_in_time: time
            },
            {
              where: {
                uid: UID
              }
            }
          )
          //
        } else {
          size = UserData.sign_in_month_count + 1
          // 更新 + 1
          await user.update(
            {
              sign_in_count: UserData.sign_in_count + 1,
              sign_in_month_count: UserData.sign_in_month_count + 1,
              sign_in_time: time
            },
            {
              where: {
                uid: UID
              }
            }
          )
        }
      } else {
        size = 0
        // 更新 + 1
        await user.update(
          {
            sign_in_count: UserData.sign_in_count + 1,
            sign_in_month_count: 0,
            sign_in_time: time
          },
          {
            where: {
              uid: UID
            }
          }
        )
      }
      //
      const count = MoenySize + Math.floor(size / 2)
      const count2 = 2

      const good = [
        {
          name: '极品灵石',
          acount: count
        },
        {
          name: '开灵铲',
          acount: count2
        }
      ]

      // 增加灵石
      Bag.addBagThing(UID, good)

      user.update(
        {
          special_spiritual: UserData.special_spiritual_limit
        },
        {
          where: {
            uid: UID
          }
        }
      )

      Send(
        Text(
          good
            .map(item => `${item.name}+${item.acount}`)
            .concat([`灵力100%`])
            .join('\n')
        )
      )

      return
    }
  ],
  ['message.create', 'private.message.create']
)
