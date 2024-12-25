import React from 'react'
import Footer from './pub/footer.js'
import css_output from './input.scss'
import { LinkStyleSheet } from 'jsxp'
import ThemeBackground from './pub/ThemeBackground.js'
import { ThemesEmun } from './pub/ThemeBackground.js'
import data from '@src/assets/defset/activety.json'
import Header from './pub/header.js'
type PropsType = {
  select: 'every_day' | 'limit_time' | 'version'
  theme: ThemesEmun
}

export default function App({ select, theme }: PropsType) {
  return (
    <html>
      <head>
        <LinkStyleSheet src={css_output} />
      </head>
      <body>
        <ThemeBackground theme={theme}>
          <div className="px-4">
            <Header />
          </div>
          <div className="px-4 py-8 flex flex-col gap-4">
            {data[select].map((item, index) => (
              <div
                className="bg-slate-200 rounded-md flex flex-col"
                key={index}
              >
                <div className=" p-2 rounded-t-md bg-slate-300">
                  {item.title}
                </div>
                <div className="p-2 ">{item.description}</div>
                {item?.time && <div className="p-2">活动时间: {item.time}</div>}
              </div>
            ))}
          </div>
          <Footer />
        </ThemeBackground>
      </body>
    </html>
  )
}
