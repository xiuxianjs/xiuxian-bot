import { appendFile, mkdirSync } from 'fs'
import { join } from 'path'

/**
 *
 * @param date
 * @returns
 */
const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const dir = join(process.cwd(), 'logs', 'mysql')
mkdirSync(dir, { recursive: true })

export const logging = (sql: string) => {
  const TIME = new Date()
  const NOW = TIME.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })
  appendFile(join(dir, `${formatDate(TIME)}.log`), `${NOW}\n${sql}\n`, err => {
    if (err) {
      console.error('Error writing to log file:', err)
    }
  })
  return false
}
