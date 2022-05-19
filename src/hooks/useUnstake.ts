import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import {
  fetchFarmUserDataAsync,
  updateUserStakedBalance,
  updateUserBalance,
  updateUserPendingReward,
} from 'state/actions'
import { unstake, sousUnstake, sousEmegencyUnstake } from 'utils/callHelpers'
import { useMasterchef, useSousChef } from './useContract'

const useUnstake = (pid: number, decimal: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account, decimal)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid, decimal],
  )

  return { onUnstake: handleUnstake }
}

const SYRUPIDS = [5, 6, 3, 1, 22, 23]

export const useSousUnstake = (sousId) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const sousChefContract = useSousChef(sousId)

  const handleUnstake = useCallback(
    async (amount: string, decimal = 18) => {
      const txHash = await sousUnstake(sousChefContract, amount, account, decimal)
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
      dispatch(updateUserPendingReward(sousId, account))
    },
  [account, dispatch, sousChefContract, sousId],
  )

return { onUnstake: handleUnstake }
}

export default useUnstake
