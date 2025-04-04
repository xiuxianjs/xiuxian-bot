import React from 'react'
import { BackgroundImage } from 'jsxp'
import { SkillInformationType } from '@xiuxian/statistics/index'
import Header from './component/header.js'
import Footer from './component/footer.js'
import img_equipment from '@src/assets/img/equipment.jpg'
import ThemeBackground, { ThemesEmun } from './component/ThemeBackground.js'
import { Avatar } from './component/Avatar.js'
import HTML from './HTML.js'
type PropsType = {
  data: SkillInformationType
  theme: ThemesEmun
  avatar: string
}
export default function XSkills({ data, theme, avatar }: PropsType) {
  return (
    <HTML>
      <ThemeBackground theme={theme}>
        <BackgroundImage className="w-full p-4" url={img_equipment}>
          <div className="p-4">
            <Header list={['/学习+功法名', '/忘掉+功法名']} />
          </div>
          <div className="rounded-lg w-full px-4 py-4">
            <div className="flex flex-row bg-black bg-opacity-30">
              <div className="flex-1 text-left mx-auto my-0 bg-black bg-opacity-20">
                <div className=" text-white text-2xl p-3 whitespace-nowrap overflow-hidden text-ellipsis">
                  {data.UID}
                </div>
                <div className=" text-white text-2xl p-3">
                  道号: {data.name}
                </div>
                <div className=" text-white text-2xl p-3">
                  灵根: {data.linggenName}
                </div>
                <div className=" text-white text-2xl p-3">
                  天赋: {data.talentsize}
                </div>
              </div>
              <div className="flex-1 flex">
                {avatar ? (
                  <Avatar
                    className="size-48 rounded-full m-auto"
                    src={avatar}
                    alt="User Avatar"
                  />
                ) : (
                  <div className="size-48 rounded-full m-auto border border"></div>
                )}
              </div>
            </div>
          </div>
          <div className="rounded-lg w-full px-4 py-4">
            {data.skills.map((item, index) => {
              const good = item['good']['dataValues']
              return (
                <div
                  key={index}
                  className=" my-4   bg-black bg-opacity-40 rounded-xl"
                >
                  <div className="flex-1  px-4 py-2 bg-black bg-opacity-40 text-white text-2xl text-left">
                    {item.name}
                  </div>
                  <div className="flex  px-4 py-2 text-white text-2xl latgrid grid-cols-3 text-left grid-flow-col gap-0 pl-14 py-2tice">
                    <div className="flex-1">天赋: {good['size']}%</div>
                    <div className="flex-1">
                      修为: +{good['exp_gaspractice']}
                    </div>
                    <div className="flex-1">灵石: {good['price']}</div>
                  </div>
                </div>
              )
            })}
          </div>
          <Footer
            list={['/我的面板', '/我的本命物', '/我的协会']}
            docs={'提示：任何物品都可以装备哦～'}
          />
        </BackgroundImage>
      </ThemeBackground>
    </HTML>
  )
}
