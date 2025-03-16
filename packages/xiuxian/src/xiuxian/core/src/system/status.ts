import { Attributes, user } from '@src/xiuxian/db'

type UserDataType = Attributes<typeof user>
/**
 * 行为
 */
export const Actions = {
  kongxian: {
    value: 0,
    name: '空闲'
  },
  biguan: {
    value: 1,
    name: '闭关'
  },
  duanti: {
    value: 2,
    name: '锻体'
  },
  ganlu: {
    value: 3,
    name: '赶路'
  },
  chuansong: {
    value: 4,
    name: '传送'
  },
  dujie: {
    value: 5,
    name: '渡劫'
  },
  kuojian: {
    value: 6,
    name: '扩建'
  },
  mijing: {
    value: 7,
    name: '秘境'
  },
  dazuo: {
    value: 8,
    name: '聚灵'
  },
  zudui: {
    value: 9,
    name: '组队'
  },
  fuben: {
    value: 10,
    name: '副本'
  }
}

export const isPass = (UserData: UserDataType) => {
  if (UserData.battle_blood_now >= 1) return true
  return false
}

type Keys = keyof typeof Actions

/**
 *
 * @param param0
 * @returns
 */
export const setStatus = (options: {
  UID: string
  key?: Keys
  end?: number
}) => {
  const { UID, key, end } = options ?? {}
  return user.update(
    {
      state: Actions[key]?.value ?? 0,
      state_start_time: Date.now(),
      state_end_time: end ?? 9999999999999
    },
    {
      where: {
        uid: UID
      }
    }
  )
}

/**
 * 是否是某个状态
 * @param UserData
 * @returns
 */
export const getStatus = (UserData: UserDataType, key: Keys = 'kongxian') => {
  const { state, state_end_time, state_start_time } = UserData
  // 空闲状态
  if (state == Actions[key].value) {
    return {
      status: 200
    }
  }
  /**
   * state 状态
   * state_end_time 结束时间
   * state_start_time 开始时间
   */
  if (Date.now() >= state_end_time + state_start_time) {
    return {
      status: 200
    }
  }
  const values = Object.values(Actions)
  const value = values.find(item => item.value == state)
  // 正在进行的状态
  return {
    status: 400,
    message: `${value.name}中...`
  }
}
