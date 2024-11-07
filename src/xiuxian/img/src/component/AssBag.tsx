import React from 'react'
import Header from './con/header.js'
import Footer from './con/footer.js'
import css_output from './input.scss'
import { LinkStyleSheet } from 'jsxp'
import ThemeBackground, { ThemesEmun } from './con/ThemeBackground.js'
import GoodInfo from './con/GoodIndo.js'
import { ass, AttributesType, goods } from '@src/xiuxian/db/index.js'
import { BackpackInformationType } from '@src/xiuxian/statistics/index.js'

type PropsType = {
  data: {
    ass: AttributesType<typeof ass>
    bag: BackpackInformationType['bag']
  }
  theme?: ThemesEmun
}

/**
 *
 * @param param0
 * @returns
 */
export default function AssBag({ data, theme }: PropsType) {
  return (
    <html>
      <head>
        <LinkStyleSheet src={css_output} />
      </head>
      <body>
        <ThemeBackground theme={theme}>
          <div className="px-4">
            <Header list={['/势力信息', '/更新公告']} />
          </div>
          <div className="px-4 text-2xl text-white  relative">
            <div className="my-1 rounded-md bg-black bg-opacity-20">
              <div className="bg-black bg-opacity-20 p-1">
                {`[${data.ass.name}](${data.ass.grade})`}
              </div>
              <div className="p-1">
                <div>{`活跃 ${data.ass.activation}`}</div>
                <div>{`名望 ${data.ass.fame}`}</div>
              </div>
            </div>
          </div>
          <main className="p-4">
            {data.bag.map((item, index) => {
              const good: AttributesType<typeof goods> =
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
            })}
          </main>
          <Footer
            list={['/我的势力信息']}
            docs={'提示：可使用贡献值换取包库物品哦～'}
          />
          <div className="min-h-10"></div>
        </ThemeBackground>
      </body>
    </html>
  )
}
