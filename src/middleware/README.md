## 中间件

```ts
import { useSend } from 'alemonjs'
export default OnMiddleware(
  (event, { next }) => {
    const Send = useSend(event)
    next()
  },
  ['message.create', 'private.message.create']
)
```
