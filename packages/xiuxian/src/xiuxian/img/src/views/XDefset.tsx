import React from 'react'
import Header from './component/header.js'
import Footer from './component/footer.js'
import ThemeBackground, { ThemesEmun } from './component/ThemeBackground.js'
import * as data from '@xiuxian/core/src/config/cooling.js'
import HTML from './HTML.js'
import { CD_MAP } from '../core/index.js'

type PropsType = {
  theme: ThemesEmun
}

export default function App({ theme }: PropsType) {
  return (
    <HTML>
      <ThemeBackground className="w-full h-full p-4" theme={theme}>
        <div className="px-4">
          <Header list={['/帮助', '/查看更新']} />
        </div>
        <div className="w-full h-full my-8 px-4  text-center">
          <div className="grid grid-cols-2 my-1 rounded-md bg-black bg-opacity-10">
            {Object.keys(CD_MAP).map((item, index) => (
              <div key={index} className="w-80 mx-auto text-3xl p-2">
                {CD_MAP[item]}: {data[item]}m
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 my-1 rounded-md bg-black bg-opacity-10">
            {[
              `闭关倍率: ${data.biguan_size}`,
              `锻体倍率:  ${data.work_size}`,
              `最多功法持有数:  ${data.myconfig_gongfa}`,
              `最多装备持有数:  ${data.myconfig_equipment}`,
              `年龄每小时增加:  ${data.Age_size}`,
              `储物袋最高等级:  ${data.Price.length}`
            ].map((item, index) => (
              <div key={index} className="w-80 mx-auto text-3xl p-2">
                {item}
              </div>
            ))}
          </div>
        </div>
        <Footer />
        <div className="min-h-10"></div>
      </ThemeBackground>
    </HTML>
  )
}
