import React from 'react'
import { AttributesType, goods } from '@xiuxian/db/index'
import { nameMap } from '../../core/index.js'
type PropsType = {
  data: AttributesType<typeof goods> & {
    addition_name: string
    acount: number
  }
}
export default function GoodInfo({ data }: PropsType) {
  return (
    <div className="bg-black bg-opacity-30 rounded-xl">
      <div className=" bg-[#2c447594] text-white text-2xl p-2">{data.name}</div>
      <div className=" text-white text-2xl grid grid-cols-3 text-left grid-flow-col gap-0 pl-14 py-2">
        {[
          `攻击: ${data.attack}%`,
          `防御: ${data.defense}%`,
          `血量: ${data.blood}%`
        ].map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      <div className=" text-white text-2xl grid grid-cols-3 text-left grid-flow-col gap-0 pl-14 py-2">
        {[
          `天赋: ${data.size}%`,
          `暴击: ${data['critical_hit']}%`,
          `暴伤: ${data['critical_damage']}%`
        ].map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      <div className=" text-white text-2xl grid grid-cols-3 text-left grid-flow-col gap-0 pl-14 py-2">
        <div>敏捷: {data['speed']}</div>
        <div>
          {nameMap[data['addition']]}: {data.addition_name}
          {data['addition'] === 'boolere_covery' && <span> % </span>}
        </div>
        <div>五行: ???</div>
      </div>
      <div
        className=" text-white text-2xl grid grid-cols-3 text-left grid-flow-col gap-0 pl-14 py-2"
        style={{ marginBottom: '5px' }}
      >
        {[
          `等级: ${data['grade']}`,
          `数量: ${data.acount}`,
          `灵石: ${data['price']}`
        ].map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  )
}
