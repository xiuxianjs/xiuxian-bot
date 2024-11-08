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
} from '@xiuxian/statistics/index.ts'
import { Goods, Cooling } from '@xiuxian/core/index.ts'
import { ass, ass_typing, user_ass } from '@xiuxian/db/index'
import update_josn from '@src/assets/defset/update.json'
import json_base_help from '@src/assets/defset/base_help.json'
import event from '@src/assets/defset/user.json'
export default defineConfig({
  routes: {
    '/AssMessage': {
      // body 内容
      component: (
        <Component.AssMessage
          theme={'purple'}
          data={await user_ass
            .findAll({
              where: {
                uid: event.UserId
              },
              include: [
                {
                  model: ass,
                  include: [
                    {
                      model: ass_typing
                    }
                  ]
                }
              ]
            })
            .then(res => res.map(item => item?.dataValues))}
        />
      )
    },
    '/BagComponent': {
      component: (
        <Component.BagComponent
          theme={'purple'}
          data={await backpackInformation(
            event.UserId,
            event.UserAvatar,
            Goods.mapType['道具']
          )}
        />
      )
    },
    '/Defsetcomponent': {
      component: <Component.Defsetcomponent theme={'dark'} data={Cooling} />
    },
    '/Equipmentcomponent': {
      // body 内容
      component: (
        <Component.Equipmentcomponent
          theme={'purple'}
          data={await equipmentInformation(event.UserId, event.UserAvatar)}
        />
      )
    },
    '/HelpComponent': {
      // body 内容
      component: (
        <Component.HelpComponent theme={'dark'} data={json_base_help} />
      )
    },
    '/UpdateComponent': {
      component: <Component.UpdateComponent theme={'dark'} data={update_josn} />
    },
    '/SkillsComponent': {
      component: (
        <Component.SkillsComponent
          theme={'dark'}
          data={await skillInformation(event.UserId, event.UserAvatar)}
        />
      )
    },
    '/KillComponent': {
      // body 内容
      component: (
        <Component.KillComponent theme={'dark'} data={await getKillList()} />
      )
    },
    '/MessageComponent': {
      component: (
        <Component.MessageComponent
          theme={'purple'}
          data={await personalInformation(event.UserId, event.UserAvatar)}
        />
      )
    },
    '/SkyComponent': {
      component: (
        <Component.SkyComponent
          theme={'dark'}
          data={await showSky(event.UserId)}
        />
      )
    }
  }
})
