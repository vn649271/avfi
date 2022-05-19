import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import erc20ABI from 'config/abi/erc20.json'
import wbnbABI from 'config/abi/weth.json'
import multicall from 'utils/multicall'
import { getWbnbAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const fetchPoolsBlockLimits = async () => {
  const poolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0)
  const callsStartTime = poolsWithEnd.map((poolConfig) => {
    return {
      address: poolConfig.contractAddress[CHAIN_ID],
      name: 'startTime',
    }
  })
  const callsEndTime = poolsWithEnd.map((poolConfig) => {
    return {
      address: poolConfig.contractAddress[CHAIN_ID],
      name: 'bonusEndTime',
    }
  })

  const starts = await multicall(sousChefABI, callsStartTime)
  const ends = await multicall(sousChefABI, callsEndTime)

  return poolsWithEnd.map((cakePoolConfig, index) => {
    const startTime = starts[index]
    const endTime = ends[index]
    return {
      sousId: cakePoolConfig.sousId,
      startTime: new BigNumber(startTime).toJSON(),
      endTime: new BigNumber(endTime).toJSON(),
    }
  })
}
export const fetchPoolsTokenPrices = async () => {
  const poolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0)
  const callsRewardToken = poolsWithEnd.map((poolConfig) => {
    return {
      address: poolConfig.rewardTokenAddress,
      name: 'balanceOf',
      params: [poolConfig.lpAddressForReward],
    }
  })
  const callsRewardBNB = poolsWithEnd.map((poolConfig) => {
    return {
      address: getWbnbAddress(),
      name: 'balanceOf',
      params: [poolConfig.lpAddressForReward],
    }
  })

  const rewardTokenBalance = await multicall(erc20ABI, callsRewardToken)
  const rewardBNBBalance = await multicall(wbnbABI, callsRewardBNB)

  const callsStakeToken = poolsWithEnd.map((poolConfig) => {
    return {
      address: poolConfig.stakingTokenAddress,
      name: 'balanceOf',
      params: [poolConfig.lpAddressForStaking],
    }
  })
  const callsStakeBNB = poolsWithEnd.map((poolConfig) => {
    return {
      address: getWbnbAddress(),
      name: 'balanceOf',
      params: [poolConfig.lpAddressForStaking],
    }
  })

  const stakeTokenBalance = await multicall(erc20ABI, callsStakeToken)
  const stakeBNBBalance = await multicall(wbnbABI, callsStakeBNB)

  return poolsWithEnd.map((cakePoolConfig, index) => {
    const rewardTokenLPBalance = rewardTokenBalance[index]
    const rewardBNBLPBalance = rewardBNBBalance[index]
    const stakeTokenLPBalance = stakeTokenBalance[index]
    const stakeBNBLPBalance = stakeBNBBalance[index]    
    return {
      sousId: cakePoolConfig.sousId,
      stakingTokenPrice: new BigNumber(stakeBNBLPBalance).div(new BigNumber(stakeTokenLPBalance)),
      rewardTokenPrice: new BigNumber(rewardBNBLPBalance).div(new BigNumber(rewardTokenLPBalance))
    }
  })
}


export const fetchPoolsTokenDecimals = async () => {
  const poolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0)
  const callsRewardToken = poolsWithEnd.map((poolConfig) => {
    return {
      address: poolConfig.rewardTokenAddress,
      name: 'decimals'
    }
  })

  const callsStakeToken = poolsWithEnd.map((poolConfig) => {
    return {
      address: poolConfig.stakingTokenAddress,
      name: 'decimals'
    }
  })

  const rewardTokenDecimals = await multicall(erc20ABI, callsRewardToken)
  const stakingTokenDecimals = await multicall(erc20ABI, callsStakeToken)

  return poolsWithEnd.map((cakePoolConfig, index) => {
    
    return {
      sousId: cakePoolConfig.sousId,
      stakingTokenDecimals: new BigNumber(stakingTokenDecimals[index]).toNumber(),
      rewardTokenDecimals: new BigNumber(rewardTokenDecimals[index]).toNumber()
    }
  })
}

export const fetchPoolsTotalStatking = async () => {

  const callsTotalStaked = poolsConfig.map((poolConfig) => {
    return {
      address: poolConfig.contractAddress[CHAIN_ID],
      name: 'totalStaked'
    }
  })

  const callsRemained = poolsConfig.map((poolConfig) => {
    return {
      address: poolConfig.contractAddress[CHAIN_ID],
      name: 'rewardBalance'
    }
  })

  const poolsTotalStaked = await multicall(sousChefABI, callsTotalStaked)
  const poolsRemained = await multicall(sousChefABI, callsRemained)

  return poolsConfig.map((cakePoolConfig, index) => {    
    return {
      sousId: cakePoolConfig.sousId,
      totalStaked: poolsTotalStaked[index],
      totalRemained: poolsRemained[index]
    }
  })
}
