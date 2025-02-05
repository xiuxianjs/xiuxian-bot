import { readFileSync } from 'node:fs'
import React from 'react'
export const ScripeModule = (
  props: React.DetailedHTMLProps<
    React.ScriptHTMLAttributes<HTMLScriptElement>,
    HTMLScriptElement
  >
) => {
  const { src, ...prop } = props
  const jsURL = src as string
  const data = readFileSync(jsURL, 'utf-8')
  return (
    <script type="module" {...prop}>
      {data}
    </script>
  )
}
