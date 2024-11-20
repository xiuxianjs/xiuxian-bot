const CD = {}
/**
 * @param UID
 * @returns
 */
export const operationLocalLock = (UID: string) => {
  const Now = Date.now()
  // 2300
  if (CD[UID] && Number(CD[UID]) + 2300 > Now) {
    return false
  }
  CD[UID] = Now
  return true
}
