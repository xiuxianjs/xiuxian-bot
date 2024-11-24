import Koa from 'koa'
import KoaRouter from 'koa-router'
import { join, resolve } from 'path'
import { mkdirSync, readdirSync, statSync } from 'fs'
import bodyParser from 'koa-bodyparser'
import jwt from 'jsonwebtoken'

let secertKey = null

// 定义OnRouter
type OnRouterTpe = (
  func: Parameters<typeof KoaRouter.prototype.get>[1],
  options: {
    method: 'get' | 'post' | 'delete' | 'put'
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
  /**
   * 更新 token
   */
  var updateTokenCookie: (ctx, options?: { maxAge?: number }) => void
}

/**
 * 深度遍历目录，返回所有文件路径
 * @param {string} dir - 要遍历的目录
 * @returns {string[]} - 所有文件的路径
 */
const getFilesRecursively = (dir: string) => {
  let results = []
  // 确保 dir 是绝对路径
  const absoluteDir = resolve(dir)
  const list = readdirSync(absoluteDir)
  for (const file of list) {
    const filePath = join(absoluteDir, file)
    const stat = statSync(filePath)
    if (stat && stat.isDirectory()) {
      // 如果是目录，递归调用
      results = results.concat(getFilesRecursively(filePath))
    } else {
      // 如果是文件，添加到结果数组
      results.push(filePath)
    }
  }
  return results
}

/**
 *
 * @param secert_key
 * @returns
 */
const tokenMiddleware = secret_key => {
  return (ctx, next) => {
    const token = ctx.cookies.get('token') // 从 Cookie 中获取 Token
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
      console.error('Token 验证失败:', err)
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
 *
 * @param ctx
 * @param param1
 */
const createCookieToken = (ctx, { data, maxAge }) => {
  const token = getToken(data, { expiresIn: '1h' })
  ctx.cookies.set('token', token, {
    // 仅在生产环境中使用 HTTPS
    // secure: process.env.NODE_ENV === 'production', //
    httpOnly: true, // 仅允许服务器访问
    maxAge: maxAge ?? 3600000 // 1小时
  })
}

/**
 * 设置token
 * @param ctx
 * @param param1
 */
const setTokenCookie = (ctx, { data, maxAge }) => {
  createCookieToken(ctx, { data, maxAge })
}

/**
 * 更新token
 * @param ctx
 * @param param1
 */
const updateTokenCookie = (ctx, { maxAge }) => {
  createCookieToken(ctx, { data: ctx.user, maxAge })
}

global.updateTokenCookie = updateTokenCookie
global.setTokenCookie = setTokenCookie

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
  // 中间件：解析请求体
  app.use(bodyParser())
  // 创建路由
  const router = new KoaRouter()
  const jwtRouter = new KoaRouter()
  mkdirSync(apiDir, { recursive: true })
  const fileDirs = getFilesRecursively(apiDir)
  // 开始载入路由
  for (const file of fileDirs) {
    const apiInfo = await import(`file://${file}`)
    const API = await apiInfo.default
    const str = file.replace(new RegExp(dir), '').replace(/.(ts|js)$/, '')
    if (
      API?.options?.jwt &&
      typeof API?.options?.method == 'string' &&
      jwtRouter[API?.options?.method]
    ) {
      jwtRouter[API?.options?.method](str, API.func)
    } else if (
      typeof API?.options?.method == 'string' &&
      router[API?.options?.method]
    ) {
      router[API?.options?.method](str, API.func)
    }
  }
  // 使用主路由
  app.use(router.routes())
  // 中间件：验证 token
  app.use(tokenMiddleware(secert_key))
  app.use(jwtRouter.routes())
  app.use(jwtRouter.allowedMethods())
  app.use(router.allowedMethods())
  return app
}
