import Xiuxian from '@src/apps/index'
import { createEventName } from '@src/apps/util'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)小白[\u4e00-\u9fa5]+$/
export default OnResponse(
  [
    Xiuxian.current,
    async (e, next) => {
      if (!/^(#|\/)小白[\u4e00-\u9fa5]+$/.test(e.MessageText)) {
        next()
        return
      }
      return
    }
  ],
  ['message.create', 'private.message.create']
)
