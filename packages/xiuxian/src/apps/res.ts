import { Text, useSend, useState } from 'alemonjs'
const open = /^(#|\/)?open:/
const close = /^(#|\/)?close:/
// 使用方法合并成一个
export const regular = new RegExp(open.source + '|' + close.source)
export default OnResponse((event, next) => {
  // 不是主人
  if (!event.IsMaster) {
    next()
    return
  }
  const name = event.MessageText.replace(regular, '')
  const Send = useSend(event)
  if (open.test(event.MessageText)) {
    const [state, setState] = useState(name, true)
    Send(Text('启用成功'))
    if (!state) {
      setState(true)
    }
  } else if (close.test(event.MessageText)) {
    const [state, setState] = useState(name, false)
    Send(Text('关闭成功'))
    if (state) {
      setState(false)
    }
  }
  next()
  return
}, 'message.create')
