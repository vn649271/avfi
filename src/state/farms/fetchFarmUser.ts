import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import farmsConfig from 'config/constants/farms'
import { getMasterChefAddress } from 'utils/addressHelpers'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const fetchFarmUserAllowances = async (account: string) => {
  const masterChefAdress = getMasterChefAddress()

  const calls = farmsConfig.map((farm) => {
    const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID]
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAdress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account: string) => {
  const calls = farmsConfig.map((farm) => {
    const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID]
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  });

  // const decimalsCalls = farmsConfig.map((farm) => {
  //   const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID];
  //   return {
  //     address: lpContractAddress,
  //     name: 'decimals'
  //   }
  // });

  const rawTokenBalances = await multicall(erc20ABI, calls);
  // const tokenDecimals = await multicall(erc20ABI, decimalsCalls);

  // const zip = rows => rows[0].map((_, c) => rows.map(row => row[c]));

  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  });

  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (account: string) => {
  const masterChefAdress = getMasterChefAddress()

  const calls = farmsConfig.map((farm) => {
    return {
      address: masterChefAdress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account: string) => {
  const masterChefAdress = getMasterChefAddress()

  const calls = farmsConfig.map((farm) => {
    return {
      address: masterChefAdress,
      name: 'pendingTerra',
      params: [farm.pid, account],
    }
  })

  const decimalsCalls = farmsConfig.map((farm) => {
    const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID];
    return {
      address: lpContractAddress,
      name: 'decimals'
    }
  });

  const rawEarnings = await multicall(masterchefABI, calls)

  const tokenDecimals = await multicall(erc20ABI, decimalsCalls);

  const zip = rows => rows[0].map((_, c) => rows.map(row => row[c]));

  const parsedEarnings = zip([rawEarnings, tokenDecimals]).map(([earnings, decimals]) => {
    // console.log(18 -decimals[0])
    return new BigNumber(earnings).div(new BigNumber(10).pow(18 - decimals[0])).toJSON()
  })
  return parsedEarnings
}
