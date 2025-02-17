import React, { PropsWithChildren } from 'react'
import css_output from '@src/assets/css/input.scss'
import { LinkStyleSheet } from 'jsxp'
export default function HTML({ children }: PropsWithChildren) {
  return (
    <html>
      <head>
        <LinkStyleSheet src={css_output} />
      </head>
      <body>{children}</body>
    </html>
  )
}
