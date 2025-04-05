import React from 'react'
import Header from './component/header.js'
import Footer from './component/footer.js'
import ThemeBackground from './component/ThemeBackground.js'
import { ThemesEmun } from './component/ThemeBackground.js'
import HTML from './HTML.js'

type PropsType = {
  data: {
    version: string
    date: string
    message: string[]
  }[]
  theme: ThemesEmun
}

/**
 *
 * @param param0
 * @returns
 */
export default function XUpdate({ data, theme }: PropsType) {
  return (
    <HTML>
      <ThemeBackground className="bg-cover p-4" theme={theme}>
        <div className="px-4">
          <Header list={['/帮助', '/修仙配置']} />
        </div>
        <div className="px-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="my-4  py-1 text-white  bg-black bg-opacity-40 "
            >
              <div className="px-2 py-1 bg-black bg-opacity-40">
                日期： {item.date}{' '}
                <span className=" text-yellow-500">版本 {item.version}</span>
              </div>
              <div className="px-2 py-1">
                {item.message.map((item, index) => (
                  <div key={index} className="py-2">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Footer
          list={['/我的功法', '/我的本命物', '/我的协会']}
          docs={'提示：任何物品都可以装备哦～'}
        />
        <div className="min-h-10"></div>
      </ThemeBackground>
    </HTML>
  )
}
