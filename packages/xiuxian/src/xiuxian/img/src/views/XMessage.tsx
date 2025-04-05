import React from 'react'
import NavMessage from './component/NavMessage.js'
import Footer from './component/footer.js'
import { PersonalInformationType } from '@xiuxian/statistics/index'
import ThemeBackground from './component/ThemeBackground.js'
import { ThemesEmun } from './component/ThemeBackground.js'
import HTML from './HTML.js'
type PropsType = {
  data: PersonalInformationType
  theme: ThemesEmun
  avatar: string
}
export default function XMessage({ data, theme, avatar }: PropsType) {
  return (
    <HTML>
      <ThemeBackground theme={theme}>
        <NavMessage data={data} avatar={avatar} />
        {
          //
        }
        <div className="p-4  text-white   pt-8 pr-4 pb-4 pl-4   relative">
          <div className="bg-[var(--bg-color)]  shadow-md  rounded-md relative px-4 py-2">
            <span className="text-2xl">{data.autograph}</span>
            <span className="text-white px-2 py-1 rounded-t-lg text-lg bg-slate-400 absolute top-[-36px] flex left-[12px]  shadow-md">
              /更改昵称为+字符
            </span>
          </div>
        </div>
        {
          //
        }
        <div className="p-4 text-2xl text-white   pt-8 pr-4 pb-4 pl-4   relative">
          <div className="bg-[var(--bg-color)] flex  shadow-md  rounded-md relative px-4 py-2">
            <div className="flex-1">
              <div className="">声望 {data.special_reputation}</div>
              <div className="">
                气血 {data.level?.bodypractice?.Experience}/
                {data.level?.bodypractice?.ExperienceLimit}
              </div>{' '}
              <div className="">
                神念 {data.level?.soul?.Experience}/
                {data.level?.soul?.ExperienceLimit}
              </div>
            </div>
            <div className="flex-1">
              <div className="">体质 {data.constitution_name}</div>
              <div className="">体境 {data.level?.bodypractice?.Name} </div>
              <div className="">魂境 {data.level?.soul?.Name}</div>
            </div>
            <span className="text-white px-2 py-1 rounded-t-lg text-lg bg-slate-400 absolute top-[-36px] flex left-[12px]  shadow-md">
              /我的面板
            </span>
          </div>
        </div>
        {
          //
        }
        {data.skills.length > 0 && (
          <div className="p-4  text-white   pt-8 pr-4 pb-4 pl-4   relative">
            <div className="bg-[var(--bg-color)] flex shadow-md  flex-wrap rounded-md relative px-4 py-2">
              {data.skills.map((item, index) => (
                <div key={index}>《{item['name']}》 </div>
              ))}
              <span className="text-white px-2 py-1 rounded-t-lg text-lg bg-slate-400 absolute top-[-36px] flex left-[12px]  shadow-md">
                {' '}
                /我的功法
              </span>
            </div>
          </div>
        )}
        {
          //
        }

        <Footer />
      </ThemeBackground>
    </HTML>
  )
}
