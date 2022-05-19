export type IfoStatus = 'coming_soon' | 'live' | 'finished'

export interface Ifo {
  id: string
  isActive: boolean
  address: string
  name: string
  subTitle?: string
  description?: string
  launchDate: string
  launchTime: string
  saleAmount: string
  raiseAmount: string
  cakeToBurn: string
  projectSiteUrl: string
  currency: string
  currencyAddress: string
  tokenDecimals: number
  releaseBlockNumber: number
}

export enum QuoteToken {
  'AVAX' = 'AVAX',
  'CAKE' = 'CAKE',
  'SYRUP' = 'SYRUP',
  'USDC' = 'USDC',
  'USDT' = 'USDT.e',
  'TWT' = 'TWT',
  'UST' = 'UST',
  'WMATIC' = 'WMATIC',
  'MATIC' = 'MATIC',
  'WETH' = 'WETH'
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
}

export interface Address {
  80001?: string
  97?: string
  43114: string
}

export interface FarmConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  tokenSymbol: string
  tokenAddresses: Address
  quoteTokenSymbol: QuoteToken
  quoteTokenAdresses: Address
  multiplier?: string
  isTokenOnly?: boolean
  isCommunity?: boolean
  otherExchange?: string
  risk: number
  decimal: number
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface PoolConfig {
  sousId: number
  image?: string
  rewardTokenName: string
  rewardTokenAddress: string
  lpAddressForReward: string
  stakingTokenName: string
  stakingLimit?: number
  stakingTokenAddress: string
  lpAddressForStaking: string
  contractAddress: Address
  poolCategory: PoolCategory
  projectLink: string
  tokenPerTime: string
  sortOrder?: number
  harvest?: boolean
}

export type Nft = {
  name: string
  description: string
  originalImage: string
  previewImage: string
  blurImage: string
  sortOrder: number
  bunnyId: number
}
