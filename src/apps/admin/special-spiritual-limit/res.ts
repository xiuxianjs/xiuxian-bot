import { Text, useSend } from 'alemonjs'
import { user, user_level } from '@src/xiuxian/db'
export default OnResponse(async (e, next) => {
  if (!/^(#|\/)天道更新灵力/.test(e.MessageText)) {
    next()
    return
  }
  if (!e.IsMaster) return
  const text = e.MessageText
  if (!text) return
  const Send = useSend(e)
  user.findAllValues().then(data => {
    Promise.all(
      data.map(item =>
        user_level
          .findOneValue({
            where: {
              uid: item.uid,
              type: 1
            }
          })
          .then(UserLevel =>
            user.update(
              {
                special_spiritual_limit:
                  100 + (UserLevel?.realm ?? 0) + item.immortal_grade
              },
              {
                where: {
                  uid: item.uid
                }
              }
            )
          )
      )
    )
  })
  Send(Text('开始推送灵力更新进程'))
  return
}, 'message.create')
