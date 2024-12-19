import React from 'react'
import Nav from './pub/Naved.js'
import Header from './pub/header.js'
import { BackpackInformationType } from '@xiuxian/statistics/index'
import Footer from './pub/footer.js'
import css_output from './input.scss'
import { LinkStyleSheet } from 'jsxp'
import ThemeBackground, { ThemesEmun } from './pub/ThemeBackground.js'
import GoodInfo from './pub/GoodIndo.js'
import { Attributes, goods } from '@src/xiuxian/db'

type PropsType = {
  data: BackpackInformationType
  theme: ThemesEmun
}

/**
 *
 * @param param0
 * @returns
 */
export default function App({ data, theme }: PropsType) {
  const UID = data.UID
  return (
    <html>
      <head>
        <LinkStyleSheet src={css_output} />
      </head>
      <body>
        <ThemeBackground theme={theme}>
          <div className="p-4">
            <Header list={['/装备+装备名', '/卸下+装备名']} />
            <Nav
              UID={UID}
              avatar={data.avatar}
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
                const good: Attributes<typeof goods> =
                  item['good']['dataValues']
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
      </body>
    </html>
  )
}
