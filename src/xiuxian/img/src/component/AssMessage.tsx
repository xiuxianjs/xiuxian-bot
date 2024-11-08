import React from 'react'
import Footer from './con/footer.js'
import { AttributesType, user_ass } from '@xiuxian/db/index'
import Header from './con/header.js'
import css_ox from './input.scss'
import { LinkStyleSheet } from 'jsxp'
import ThemeBackground, { ThemesEmun } from './con/ThemeBackground.js'
type PropsType = {
  data: AttributesType<typeof user_ass>[]
  theme?: ThemesEmun
}
export default function AssMessage({ data, theme }: PropsType) {
  return (
    <html>
      <head>
        <LinkStyleSheet src={css_ox} />
      </head>
      <body>
        <ThemeBackground theme={theme}>
          <div className="px-4">
            <Header list={['/势力信息', '/更新公告']} />
          </div>
          <div className="px-4 text-2xl text-white  relative">
            {data.map((item, index) => {
              const ass = item['ass']['dataValues']
              const assTyping = ass['ass_typing']['dataValues']
              // 待加入
              return (
                <div
                  key={index}
                  className="my-1 rounded-md bg-black bg-opacity-20"
                >
                  <div className="bg-black bg-opacity-20 p-1">
                    {`[${ass['name']}](${ass['grade']})`}
                  </div>
                  <div className="p-1">
                    <div>{`身份 ${assTyping[item.identity]}`}</div>
                    <div>{`灵池 ${ass['property']}`}</div>
                    <div>{`活跃 ${ass['activation']}`}</div>
                    <div>{`名望 ${ass['fame']}`}</div>
                    <div>{`贡献 ${item.contribute}`}</div>
                  </div>
                </div>
              )
            })}
          </div>
          <Footer
            list={[
              '/审核',
              '/通过',
              '/踢出',
              '/提拔',
              '/贬职',
              '/建立',
              '/解散',
              '/加入',
              '/退出',
              '/查看',
              '/势力'
            ]}
            docs={'新手指引:XXX'}
          />
        </ThemeBackground>
      </body>
    </html>
  )
}
