export type Inspect = (value: unknown, options: Options) => string

export interface Options {
  showHidden: boolean
  depth: number
  colors: boolean
  customInspect: boolean
  showProxy: boolean
  maxArrayLength: number
  breakLength: number
  truncate: number
  seen: Set<unknown>
  inspect: Inspect
  stylize: (value: string, styleType: string) => string
}
