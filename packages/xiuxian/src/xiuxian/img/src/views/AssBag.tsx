import React from 'react'
import Header from './component/header.js'
import Footer from './component/footer.js'
import ThemeBackground, { ThemesEmun } from './component/ThemeBackground.js'
import GoodInfo from './component/GoodIndo.js'
import { ass, Attributes, goods } from '@src/xiuxian/db'
import { BackpackInformationType } from '@src/xiuxian/statistics/index.js'
import HTML from './HTML.js'

type PropsType = {
  data: {
    ass: Attributes<typeof ass>
    bag: BackpackInformationType['bag']
  }
  theme: ThemesEmun
}

/**
 *
 * @param param0
 * @returns
 */
export default function AssBag({ data, theme }: PropsType) {
  return (
    <HTML>
      <ThemeBackground theme={theme}>
        <div className="px-4">
          <Header list={['/我的势力', '/查看更新']} />
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
          })}
        </main>
        <Footer
          list={['/我的我的势力']}
          docs={'提示：可使用贡献值换取包库物品哦～'}
        />
        <div className="min-h-10"></div>
      </ThemeBackground>
    </HTML>
  )
}
