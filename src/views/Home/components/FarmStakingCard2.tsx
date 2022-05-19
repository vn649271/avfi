import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import { useFarmFromPid, useFarmFromSymbol, useFarmUser } from 'state/hooks'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import { usePriceCakeBusd } from '../../../state/hooks'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getCakeAddress } from '../../../utils/addressHelpers'
import useAllEarnings from '../../../hooks/useAllEarnings'
import { getBalanceNumber } from '../../../utils/formatBalance'


const StyledFarmStakingCard = styled(Card)`
position: relative;
overflow: hidden;
z-index: 2;

&:before {
  content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 90%;
    z-index: -1;
    opacity: 0.9;
  background-image: url('/images/farms/sol3.gif');
  background-repeat: no-repeat;
  background-position: top center;
  min-height: 496px;
  }
`

const DepA = styled.a`
  display: inline-block !important;
  width: 408px;
  margin-left: auto;
  margin-right: auto;
`
const DepButton = styled(Button)`
  background-color: #FFFFFF;
	color: #fb2141;
	font-size: 22px;
  &:hover {
	background-color: #fb2141;
	color: #FFFFFF;
  }
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => "#E9EAEB"};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const token = getCakeAddress();

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const eggPrice = usePriceCakeBusd().toNumber()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)
  
   

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  const addWatchJaguarToken = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const provider = window.ethereum
    if (provider) {
      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await provider.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: token,
              symbol: 'TERRA',
              decimals: '18',
              image: './images/egg/3.png',
            },
          },
        })

        if (wasAdded) {
          // console.log('Token was added')
        }
      } catch (error) {
        // TODO: find a way to handle when the user rejects transaction or it fails
      }
    }
  }, [])

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="xl" mb="17px" color="#FFFFFF">
          Boost & Pools
        </Heading>
        <Heading size="lg" mb="11px" color="#FFFFFF">
          Day 9, Live !
        </Heading>
        <Heading size="1g" mb="5px" color="#FFFFFF">
          New Pool ! DAI-USDT.e LP x600
        </Heading>
        <Heading size="1g" mb="18px" color="#FFFFFF">
          New Pool ! TERRA-USDT.e LP x3500
        </Heading>
        <Heading size="lg" mb="13px" color="#FFFFFF">
          Day 10
        </Heading>
        <Heading size="1g" mb="5px" color="#FFFFFF">
          TERRA-USDT.e LP x15000
        </Heading>
        <Heading size="1g" mb="16px" color="#FFFFFF">
          ++Boost, 0.006 New Terra Per Second
        </Heading>
        <Heading size="1g" mb="1px" color="#f9d5d5">
          - <a href="https://docs.avaterra.finance/tokenomics/boost" rel="noreferrer" target="_blank">History</a> -
        </Heading>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
