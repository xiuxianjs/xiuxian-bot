import React from 'react'
import { BackgroundImage } from 'jsxp'
import img_equipment from '@src/assets/img/equipment.jpg'
import { ThemesEmun } from './component/ThemeBackground.js'
import HTML from './HTML.js'
type PropsType = {
  data: {
    group: string
    list: {
      title: string
      desc: string
    }[]
  }[]
  theme: ThemesEmun
}
export default function XHelp({ data, theme }: PropsType) {
  const _email = 'ningmengchongshui@gmail.com'
  return (
    <HTML>
      <BackgroundImage id="root" data-theme={theme} url={img_equipment}>
        <div className="min-h-10"></div>
        <div className="text-xl m-8 p-2  rounded-md bg-black bg-opacity-20 text-center text-white relative shadow-lg font-semibold">
          <div className="text-red-500 text-left  py-1 px-3 my-2 rounded-md  bg-white">
            <div className="flex">
              <div className="w-32  text-green-500">反馈邮箱</div>
              <div className="flex-1 text-2xl text-left  text-yellow-500 inline-block px-3 font-semibold">
                {_email}
              </div>
            </div>
          </div>
          <div className="text-red-500 text-left bg-white py-1 px-3 my-2 rounded-md">
            使用 /帮助1 查看第一页，使用 /帮助2 查看第二页，以此类推
          </div>
        </div>
        {data.map((val, index) => (
          <div
            key={index}
            className="rounded-md mb-5 ml-10 mr-10 overflow-hidden shadow-md relative bg-black bg-opacity-60"
          >
            <div className="text-white text-lg font-bold px-2 text-center">
              {val.group}
            </div>
            <div className="bg-white bg-opacity-90">
              {val.list.map((item, index) => (
                <div key={index} className="px-4 py-2">
                  <div className="flex">
                    <div className=" font-bold">{item.title}</div>
                    <div className="px-2">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="min-h-10"></div>
      </BackgroundImage>
    </HTML>
  )
}
