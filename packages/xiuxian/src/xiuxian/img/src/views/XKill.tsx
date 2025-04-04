import { getHash as hash } from 'chat-space'
import React from 'react'
import ListTable from './component/ListTable.js'
import { killInformationType } from '@xiuxian/statistics/index'
import { ThemesEmun } from './component/ThemeBackground.js'
import HTML from './HTML.js'
type PropsType = {
  data: killInformationType
  theme: ThemesEmun
}
export default function XKill({ data, theme }: PropsType) {
  return (
    <HTML>
      <ListTable data={data} theme={theme}>
        {item => (
          <div className="flex-1 flex  flex-col justify-center  text-white px-8">
            <div className="flex  flex-col">
              <div className="  text-2xl p-[5px]  whitespace-nowrap overflow-hidden text-ellipsis ">
                {item.id}#{isNaN(Number(item.UID)) ? hash(item.UID) : item.UID}
              </div>
              <div className="  text-2xl  p-[5px]">道号: {item.lifeName}</div>
              <div className="  text-2xl p-[5px]">煞气: {item.prestige}</div>
              <div className="  text-2xl  p-[5px]">战力: {item.power}</div>
            </div>
          </div>
        )}
      </ListTable>
    </HTML>
  )
}
