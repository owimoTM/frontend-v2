import farmsConfig from './farms'
import masterchef from './masterchef'

const communityFarms = farmsConfig.filter((farm) => farm.isCommunity).map((farm) => farm.tokenSymbol)

export { farmsConfig, communityFarms, masterchef }
export { default as poolsConfig } from './pools'
