import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const CAKE_PER_BLOCK = new BigNumber(0.1)
export const BLOCKS_PER_YEAR = new BigNumber(10512000)
export const SECONDS_PER_YEAR = new BigNumber(31536000)
export const BSC_BLOCK_TIME = 2

export const CAKE_POOL_PID = 2
