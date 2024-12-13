import Koa from 'koa'
import KoaRouter from 'koa-router'
import { join } from 'path'
import { Dirent, existsSync, mkdirSync, readdirSync } from 'fs'
import jwt from 'jsonwebtoken'

let secertKey = null

// 定义OnRouter
type OnRouterTpe = (
  func: Parameters<
    | typeof KoaRouter.prototype.get
    | typeof KoaRouter.prototype.post
    | typeof KoaRouter.prototype.delete
    | typeof KoaRouter.prototype.put
  >[1],
  options?: {
    jwt?: boolean
  }
) => { func; options }

declare global {
  /**
   * 设置接口
   */
  var OnRouter: OnRouterTpe
  /**
   * 设置 token
   */
  var setTokenCookie: (ctx, options: { maxAge?: number; data: any }) => void
}

/**
 * 递归获取所有文件
 * @param dir
 * @param condition
 * @returns
 */
const getDirFiles = (
  dir: string,
  condition: (func: Dirent) => boolean
): {
  path: string
  name: string
}[] => {
  //
  let results: {
    path: string
    name: string
  }[] = []
  if (!existsSync(dir)) return results
  const list = readdirSync(dir, { withFileTypes: true })
  list.forEach(item => {
    const fullPath = join(dir, item.name)
    if (item.isDirectory()) {
      results = results.concat(getDirFiles(fullPath, condition))
    } else if (item.isFile() && condition(item)) {
      results.push({
        path: fullPath,
        name: item.name
      })
    }
  })
  return results
}

/**
 * 客户端
 * @param userAgent
 * @returns
 */
const isNonWebEnvironment = (userAgent: string) => {
  // 这里可以添加非 web 环境的 User-Agent 检查
  const nonWebUserAgents = [
    'news-mobile-client', // 你的移动应用的 User-Agent 示例
    'another-client' // 其他客户端的 User-Agent 示例
  ]
  return nonWebUserAgents.some(agent => userAgent.includes(agent))
}

/**
 *
 * @param secert_key
 * @returns
 */
const tokenMiddleware = (secret_key: string) => {
  return (ctx, next) => {
    let token = ctx.cookies.get('token') // 从 Cookie 中获取 Token

    // 检查 User-Agent，判断是否为非 web 环境
    const userAgent = ctx.headers['user-agent']

    // 如果 Cookie 中没有 Token，且在非 web 环境下，尝试从 Authorization header 中获取
    if (!token && isNonWebEnvironment(userAgent)) {
      const authHeader = ctx.headers['authorization'] // 修正为正确的 header 名称
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1] // 获取 Bearer 后面的 token
      }
    }
    if (!token) {
      ctx.status = 401
      ctx.body = { message: '未提供 token' }
      return
    }
    try {
      const decoded = jwt.verify(token, secret_key)
      ctx.state.user = decoded // 将用户信息存入 ctx.state
      return next()
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        // 只打印过期错误信息
        logger.error('Token expired')
      } else {
        // 打印其他错误信息（可选）
        logger.error('Token 验证失败:', err.message)
      }
      ctx.status = 401
      ctx.body = { message: '无效的 token' }
    }
  }
}

const OnRouter: OnRouterTpe = (func, options) => ({ func, options })
global.OnRouter = OnRouter

const getToken = (
  payload: string | Buffer | object,
  options?: jwt.SignOptions
) => {
  return jwt.sign(payload, secertKey, options)
}

/**
 * 设置token
 * @param ctx
 * @param param1
 */
const setTokenCookie = (ctx, { data, maxAge }) => {
  const H = 9
  const token = getToken(data, { expiresIn: `${H}h` })
  ctx.cookies.set('token', token, {
    // 仅在生产环境中使用 HTTPS
    // secure: process.env.NODE_ENV === 'production',
    httpOnly: true, // 仅允许服务器访问
    maxAge: maxAge ?? 1000 * 60 * 60 * H
  })
}

global.setTokenCookie = setTokenCookie

const requestLoggerMiddleware = () => {
  return async (ctx, next) => {
    const protocolStr = ctx.protocol.padEnd(5, ' ')
    const methodStr = ctx.method.padEnd(6, ' ')
    logger.info(`[${protocolStr}][${methodStr}]${ctx.path}`)
    // 打印请求参数
    if (Object.keys(ctx.query).length > 0) {
      logger.info('query:', ctx.query)
    }
    // 打印请求体
    if (ctx.request.body && Object.keys(ctx.request.body).length > 0) {
      logger.info('body:', ctx.request.body)
    }
    // 继续处理请求
    await next()
  }
}

export const useRouter = async (
  app: Koa,
  {
    dir,
    secert_key
  }: {
    dir: string
    secert_key: string
  }
) => {
  // 验证 secert_key
  secertKey = secert_key
  // 验证 dir
  const apiDir = join(dir, 'api')
  // 打印请求
  app.use(requestLoggerMiddleware())
  // 创建路由
  const router = new KoaRouter()
  const jwtRouter = new KoaRouter()
  mkdirSync(apiDir, { recursive: true })
  // 得到路径信息
  const dirfiles = getDirFiles(apiDir, item => {
    // 生产环境下，忽略test文件
    if (process.env.NODE_ENV === 'production') {
      return (
        /(\.|\..*\.)(js|ts|jsx|tsx)$/.test(item.name) &&
        !/.test/.test(item.name)
      )
    }
    // 其他环境下
    return /(\.|\..*\.)(js|ts|jsx|tsx)$/.test(item.name)
  })
  // 开始载入路由
  for (const file of dirfiles) {
    const apiInfo = await import(`file://${file.path}`)
    const API = await apiInfo.default
    const str = file.path
      .replace(new RegExp(dir), '')
      .replace(new RegExp(file.name), '')
    const rout = str.replace(/(.(get|post|put|delete))?.(js||ts)$/, '')
    let [name, method] = file.name.split('.')
    if (!/(get|post|put|delete)/.test(method)) {
      method = 'get'
    }
    const route = `${rout}/${name}`
    const methodStr = method.padEnd(6, ' ')
    logger.info(`[${methodStr}]${route}`)
    if (API?.options?.jwt && jwtRouter[method]) {
      jwtRouter[method](route, API.func)
    } else if (router[method]) {
      router[method](route, API.func)
    }
  }
  // 使用主路由
  app.use(router.routes())
  // 中间件：验证 token
  app.use(tokenMiddleware(secert_key))
  // 路由拦截
  app.use(jwtRouter.routes())
  app.use(jwtRouter.allowedMethods())
  app.use(router.allowedMethods())
  return app
}
