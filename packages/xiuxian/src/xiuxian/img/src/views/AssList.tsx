import React from 'react'
import Footer from './component/footer.js'
import { ass, Attributes } from '@xiuxian/db/index'
import Header from './component/header.js'
import ThemeBackground, { ThemesEmun } from './component/ThemeBackground.js'
import HTML from './HTML.js'
type PropsType = {
  data: Attributes<typeof ass>[]
  theme: ThemesEmun
}
export default function AssList({ data, theme }: PropsType) {
  return (
    <HTML>
      <ThemeBackground theme={theme}>
        <div className="px-4">
          <Header list={['/我的势力', '/查看更新']} />
        </div>
        <div className="px-4 text-2xl text-white  relative">
          {data.map((item, index) => (
            <div key={index} className="my-1 rounded-md bg-black bg-opacity-20">
              <div className="bg-black bg-opacity-20 p-1">
                {`[${item.name}](${item.grade})`}
              </div>
              <div className="p-1">
                <div>{`活跃 ${item.activation}`}</div>
                <div>{`名望 ${item.fame}`}</div>
              </div>
            </div>
          ))}
        </div>
        <Footer
          list={[
            '/审核',
            '/通过',
            '/逐出',
            '/建立',
            '/解散',
            '/加入',
            '/退出',
            '/查看'
          ]}
          docs={'新人指引: 加入数量有限哦，切莫发起过毒申请'}
        />
      </ThemeBackground>
    </HTML>
  )
}
