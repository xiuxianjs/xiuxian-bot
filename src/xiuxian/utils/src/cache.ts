import { BufferData } from 'chat-space'
import { pictureRender } from '@xiuxian/img/index'
import json_update from '@src/assets/defset/update.json'
import json_base_help from '@src/assets/defset/base_help.json'
const helpData = {}
/**
 * 帮助图缓存
 * @param name
 * @returns
 */
export async function urlHelpCache(name: string) {
  const names = {
    base_help: json_base_help,
    update: json_update
  }
  // 缓存不存在
  if (Object.prototype.hasOwnProperty.call(helpData, name)) {
    // 返回
    return helpData[name]
  }
  // 得数据
  helpData[name] = await pictureRender('HelpComponent', {
    data: names[name],
    theme: 'dark'
  }).catch(err => {
    // 发生错误
    console.error(err)
    return false
  })
}

const ABuffer = new BufferData()

/**
 * 缓存型的本地图片
 * @param name
 * @returns
 */
export function lcalCacheImage(name: string) {
  // 缓存不存在
  if (!Object.prototype.hasOwnProperty.call(helpData, name)) {
    const img = ABuffer.getPath(name)
    if (!img) return
    helpData[name] = img
  }
  // 返回
  return helpData[name]
}
