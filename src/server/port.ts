import { exec } from 'child_process'
import { promisify } from 'util'

const sleep = promisify(setTimeout)

/**
 * 杀死占用端口的进程（Linux）
 * @param port
 * @returns
 */
const killProcessLinux = (port: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    exec(`lsof -t -i:${port}`, (err, stdout) => {
      if (err) {
        resolve(false)
        return
      }
      const pid = stdout.trim()
      if (pid) {
        exec(`kill -9 ${pid}`, killErr => {
          if (killErr) {
            reject(killErr)
          } else {
            logger.info(`已杀死进程 ${pid}，占用端口 ${port}`)
            resolve(true)
          }
        })
      } else {
        resolve(true)
      }
    })
  })
}

/**
 * 杀死占用端口的进程（Windows）
 * @param port
 * @returns
 */
const killProcessWindows = (port: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    exec(`netstat -ano | findstr :${port}`, (err, stdout) => {
      if (err) {
        resolve(false)
        return
      }
      const lines = stdout.trim().split('\n')
      if (lines.length > 0) {
        const pid = lines[0].trim().split(/\s+/).pop()
        exec(`taskkill /PID ${pid} /F`, killErr => {
          if (killErr) {
            reject(killErr)
          } else {
            logger.info(`已杀死进程 ${pid}，占用端口 ${port}`)
            resolve(true)
          }
        })
      } else {
        resolve(true)
      }
    })
  })
}

/**
 * 启动服务器
 * @param port
 * @param callback
 * @returns
 */
export const startServer = async (
  port: number,
  callback: () => void
): Promise<void> => {
  const platform = process.platform
  if (platform === 'linux' || platform === 'darwin') {
    return killProcessLinux(port)
      .then(async res => {
        if (res) await sleep(2000)
      })
      .then(callback)
      .catch(console.error)
  } else if (platform === 'win32') {
    return killProcessWindows(port)
      .then(async res => {
        if (res) await sleep(2000)
      })
      .then(callback)
      .catch(console.error)
  }
}
