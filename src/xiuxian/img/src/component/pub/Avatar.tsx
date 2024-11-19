import React from 'react'

/**
 * 如果不是discord服，
 * 却看到discord头像，
 * 将采用默认头像
 * 确保国内服务器能正常请求资源
 * @param url
 * @returns
 */
const requestToLocal = (url: string) => {
  if (/discordapp/.test(url) && !process.argv.includes('discord')) {
    return 'https://q1.qlogo.cn/g?b=qq&s=0&nk=1715713638'
  }
  return url
}

export function Avatar(
  props?: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) {
  const { src, ...prop } = props ?? {}
  return <img {...prop} src={requestToLocal(src)} />
}
