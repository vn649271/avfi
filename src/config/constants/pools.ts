import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 1,
    stakingTokenName: 'IST',
    stakingTokenAddress: '0xD85afb9f3A131Ad7b881E39681a132C2c723C135',
    lpAddressForStaking: '0x7b08d09db6cbc316fdc4f30371be06ef9c389e45',// bnb-rewardtoken
    rewardTokenName: "USDC",
    rewardTokenAddress: '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',
    lpAddressForReward: '0xbd918ed441767fe7924e99f6a0e0b568ac1970d9',// bnb-stkingtoken
    contractAddress: {
      80001: '0xB15C15239abA7C148434B32dc87d4aB40Eb247CE',
      43114: '0x0bc1B61Eda64947DfaDC65EA7744E989EB02a174'
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://pancakeswap.finance/',
    harvest: true,
    tokenPerTime: '1',
    sortOrder: 1
  }
]

export default pools
