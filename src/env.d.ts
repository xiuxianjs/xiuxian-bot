/// <reference types="lvyjs/env" />
/// <reference types="alemonjs/env" />

declare module '*.sql' {
  const src: string
  export default src
}
