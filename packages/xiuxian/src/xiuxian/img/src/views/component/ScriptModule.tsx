import { readFileSync } from 'node:fs'
import React from 'react'

type PropsType = React.DetailedHTMLProps<
  React.ScriptHTMLAttributes<HTMLScriptElement>,
  HTMLScriptElement
>

export const ScripeModule = (props: PropsType) => {
  const { src, ...prop } = props
  const jsURL = src as string
  const data = readFileSync(jsURL, 'utf-8')
  return (
    <script type="module" {...prop}>
      {data}
    </script>
  )
}
