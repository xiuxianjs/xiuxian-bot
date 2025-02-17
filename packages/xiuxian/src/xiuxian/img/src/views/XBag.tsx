import React from 'react'
import Nav from './component/Naved.js'
import Header from './component/header.js'
import { BackpackInformationType } from '@xiuxian/statistics/index'
import Footer from './component/footer.js'
import ThemeBackground, { ThemesEmun } from './component/ThemeBackground.js'
import GoodInfo from './component/GoodIndo.js'
import { Attributes, goods } from '@src/xiuxian/db'
import HTML from './HTML.js'

type PropsType = {
  data: BackpackInformationType
  theme: ThemesEmun
  avatar: string
}

/**
 *
 * @param param0
 * @returns
 */
export default function App({ data, theme, avatar }: PropsType) {
  return (
    <HTML>
      <ThemeBackground theme={theme}>
        <div className="p-4">
          <Header list={['/装备+装备名', '/卸下+装备名']} />
          <Nav
            UID={data.UID}
            avatar={avatar}
            list={[
              `道号: ${data.name}`,
              `等级: ${data.bag_grade}`,
              `格子: ${data.length}/${data.bag_grade * 10}`
            ]}
          />
        </div>
        <main className="p-4">
          {
            // GoodInfo
            data.bag.map((item, index) => {
              const good: Attributes<typeof goods> = item['good']['dataValues']
              return (
                <GoodInfo
                  key={index}
                  data={{
                    ...good,
                    addition_name: good[good.addition],
                    acount: item.acount
                  }}
                />
              )
            })
          }
        </main>
        <Footer
          list={['/我的功法', '/我的本命物', '/我的协会']}
          docs={'提示：任何物品都可以装备哦～'}
        />
        <div className="min-h-10"></div>
      </ThemeBackground>
    </HTML>
  )
}
