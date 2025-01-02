import React from 'react'
import Header from './header.js'
import classNames from 'classnames'
import { PersonalInformationType } from '@xiuxian/statistics/index'
import { getImmortalGradeValue } from '@src/xiuxian/core/src/system/fight.js'
import { Avatar } from './Avatar.js'

type PropsType = {
  data: PersonalInformationType
  avatar: string
}

/**
 *
 * @param param0
 * @returns
 */
export default function NavMessage({ data, avatar }: PropsType) {
  // 现在的血量   血量总量
  const value = Math.floor(
    ((data?.battle_blood_now ?? 0) / (data?.battle_blood_limit ?? 1)) * 100
  )
  //
  /**
   *
   * @param a
   * @returns
   */
  const show = (a: number) => {
    const b = a + 5
    if (
      data.talent_show &&
      (data.talent.includes(a) || data.talent.includes(b))
    ) {
      return 'initial'
    } else {
      return 'grayscale(100%)'
    }
  }
  const List = [
    {
      title: '金',
      className: 'bg-yellow-500',
      style: {
        filter: show(1)
      }
    },
    {
      title: '木',
      className: 'bg-green-500',
      style: {
        filter: show(2)
      }
    },
    {
      title: '水',
      className: 'bg-blue-500',
      style: {
        filter: show(3)
      }
    },
    {
      title: '火',
      className: 'bg-red-500',
      style: {
        filter: show(4)
      }
    },
    {
      title: '土',
      className: 'bg-indigo-500',
      style: {
        filter: show(5)
      }
    }
  ]

  return (
    <div className="p-4 text-white">
      <Header />
      <div className="bg-[var(--bg-color)]  mt-10 nav-box p-4 pt-4 pb-8 rounded-t-xl flex justify-between relative">
        {
          //
        }
        <span className="text-white px-2 py-1 rounded-t-lg text-lg bg-slate-400 absolute top-[-36px] flex left-[12px]  shadow-md">
          /我的资料
        </span>
        {
          //
        }
        <span className="text-white rounded-t-lg text-lg absolute top-[-23px] flex right-0">
          {List.map((item, index) => (
            <span
              key={index}
              className={classNames(
                'rounded-full m-1 size-8 text-center shadow border-2 border-white ',
                item.className
              )}
              style={item.style}
            >
              {item.title}
            </span>
          ))}
        </span>

        {
          // 1
        }

        <div className="flex-1  text-2xl m-auto">
          <div className="flex justify-center overflow-hidden whitespace-nowrap">
            <span className="  font-bold ">{data.name}</span>
          </div>
          <div className="flex justify-center overflow-hidden whitespace-nowrap">
            <span>
              {data.level?.gaspractice?.Name}{' '}
              {data.level?.gaspractice?.Name == '仙人'
                ? `+ ${data.immortal_grade}`
                : ''}
            </span>
          </div>
          <div className="flex justify-center overflow-hidden whitespace-nowrap">
            {data.level?.gaspractice?.Experience}/
            {data.level?.gaspractice?.ExperienceLimit}
          </div>
        </div>

        {
          // 2
        }
        <div className="flex-1 m-auto relative text-center">
          {avatar ? (
            <Avatar
              className="size-52 rounded-full m-auto border-2 border-white"
              src={avatar}
              alt="User Avatar"
            />
          ) : (
            <div className="size-52 rounded-full m-auto border"></div>
          )}
          {
            // 血条
          }
          <div
            className="
            whitespace-nowrap overflow-hidden text-ellipsis
            absolute nav-box-uidwhitespace-nowrap text-3xl text-center w-full bottom-0 text-[#ffffffe6] font-bold rounded-xl"
            style={{
              background: `linear-gradient(to right, var(--bool-left-collor) ${value}%,var(--bool-right-collor) ${value}%)`
            }}
          >
            {data.UID}
          </div>

          <div className="absolute nav-box-uidwhitespace-nowrap  text-center w-full text-[#ffffffe6] font-bold rounded-xl">
            {`${data.battle_blood_now}/${data.battle_blood_limit}-${value}%`}
          </div>
          {
            // 百分比
          }
        </div>

        {
          // 3
        }
        <div className="flex-1 m-auto text-2xl  text-left">
          {
            // 战力
          }
          <div className=" overflow-hidden whitespace-nowrap">
            <span>
              战力 {Math.floor(data.battle_power)}
              {data.immortal_grade > 0
                ? ` * ${getImmortalGradeValue(data.immortal_grade)}`
                : ''}
            </span>
          </div>
          <div className=" overflow-hidden whitespace-nowrap">
            <span>天赋 {data.talentsize}</span>
          </div>
          <div className=" overflow-hidden whitespace-nowrap">
            {data.immortal_grade > 0 ? '仙力' : '灵力'} {data.special_spiritual}
            /{data.special_spiritual_limit}
          </div>
          <div className=" overflow-hidden whitespace-nowrap">
            煞气 {data.special_prestige}/100
          </div>
        </div>
      </div>
    </div>
  )
}
