import type { Options } from './types.js'
type GetPromiseValue = (value: Promise<unknown>, options: Options) => string
const getPromiseValue: GetPromiseValue = () => 'Promise{…}'
export default getPromiseValue
