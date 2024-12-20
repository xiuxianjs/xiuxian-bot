import '@src/sql'
import React from 'react'
import { defineConfig } from 'jsxp'
import { Component } from '@xiuxian/img/index'
import {
  personalInformation,
  backpackInformation,
  equipmentInformation,
  getKillList,
  showSky,
  skillInformation
} from '@xiuxian/statistics'
import { Goods, Cooling } from '@xiuxian/core/index.ts'
import { ass, ass_typing, user_ass } from '@xiuxian/db'
import update_josn from '@src/assets/defset/update.json'
import json_base_help from '@src/assets/defset/base_help.json'
import event from '@src/assets/defset/user.json'

export default defineConfig({
  routes: {
    '/HelpComponent': {
      // body 内容
      component: (
        <Component.HelpComponent theme={'dark'} data={json_base_help} />
      )
    }
    // '/AssMessage': {
    //   // body 内容
    //   component: (
    //     <Component.AssMessage
    //       theme={'purple'}
    //       data={await user_ass
    //         .findAll({
    //           where: {
    //             uid: event.UserKey
    //           },
    //           include: [
    //             {
    //               model: ass,
    //               include: [
    //                 {
    //                   model: ass_typing
    //                 }
    //               ]
    //             }
    //           ]
    //         })
    //         .then(res => res.map(item => item?.dataValues))}
    //     />
    //   )
    // },
    // '/BagComponent': {
    //   component: (
    //     <Component.BagComponent
    //       theme={'purple'}
    //       data={await backpackInformation(
    //         event.UserKey,
    //         event.UserAvatar,
    //         Goods.mapType['道具']
    //       )}
    //     />
    //   )
    // },
    // '/Defsetcomponent': {
    //   component: <Component.Defsetcomponent theme={'dark'} data={Cooling} />
    // },
    // '/Equipmentcomponent': {
    //   // body 内容
    //   component: (
    //     <Component.Equipmentcomponent
    //       theme={'purple'}
    //       data={await equipmentInformation(event.UserKey, event.UserAvatar)}
    //     />
    //   )
    // },
    // '/UpdateComponent': {
    //   component: <Component.UpdateComponent theme={'dark'} data={update_josn} />
    // },
    // '/SkillsComponent': {
    //   component: (
    //     <Component.SkillsComponent
    //       theme={'dark'}
    //       data={await skillInformation(event.UserKey, event.UserAvatar)}
    //     />
    //   )
    // },
    // '/KillComponent': {
    //   // body 内容
    //   component: (
    //     <Component.KillComponent theme={'dark'} data={await getKillList()} />
    //   )
    // },
    // '/MessageComponent': {
    //   component: (
    //     <Component.MessageComponent
    //       theme={'purple'}
    //       data={await personalInformation(event.UserKey, event.UserAvatar)}
    //     />
    //   )
    // },
    // '/SkyComponent': {
    //   component: (
    //     <Component.SkyComponent
    //       theme={'dark'}
    //       data={await showSky(event.UserKey)}
    //     />
    //   )
    // },
    // '/Activety': {
    //   component: <Component.Activety theme={'dark'} select="limit_time" />
    // }
  }
})
