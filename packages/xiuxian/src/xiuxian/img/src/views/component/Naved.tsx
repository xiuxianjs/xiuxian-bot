import React from 'react'
import { Avatar } from './Avatar'
export default function Naved({
  list,
  UID,
  avatar
}: {
  list: string[]
  UID: string | number
  avatar: string
}) {
  return (
    <nav className="flex justify-between w-full">
      <div className="flex-1 bg-black bg-opacity-30">
        <div className=" bg-[#2c447594] text-white text-2xl p-3 whitespace-nowrap overflow-hidden text-ellipsis">
          {UID}
        </div>
        {list.map((item, index) => (
          <div key={index} className=" text-white text-2xl p-3">
            {item}
          </div>
        ))}
      </div>
      <div className="flex-1 flex">
        {avatar ? (
          <Avatar
            className="size-60 rounded-full m-auto"
            src={avatar}
            alt="User Avatar"
          />
        ) : (
          <div className="size-60 rounded-full m-auto border"></div>
        )}
      </div>
    </nav>
  )
}
