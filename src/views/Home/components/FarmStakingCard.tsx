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
    height: 100%;
    z-index: -1;
    opacity: 0.9;
  background-image: url('/images/egg/farmstaking.png');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
  }
`

const DepA = styled.a`
  display: inline-block !important;
  width: 408px;
  margin-left: auto;
  margin-right: auto;
`
const DepButton = styled(Button)`
  background-color: #F9D5D5;
	color: #fb2141;
	font-size: 22px;
  &:hover {
	background-color: #f9d5d5;
	color: #1b1b46;
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
              image: 'https://app.avaterra.finance/images/egg/3.png',
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
        <Heading size="xl" mb="24px" color="#FFFFFF">
          {TranslateString(542, 'Farms & Staking')}
        </Heading>
        <Block>
          <Label>{TranslateString(544, 'TERRA to Harvest')}</Label>
          <CakeHarvestBalance earningsSum={earningsSum}/> {/* XXXXXX LEVA IL x2 SE NON C'é IL DOUBLE HARVEST */}
          <Label>~${(eggPrice * earningsSum).toFixed(2)}</Label>
        </Block>
        <Block>
          <Label>{TranslateString(546, 'TERRA in Wallet')}</Label>
          <CakeWalletBalance cakeBalance={cakeBalance} />
          <Label>~${(eggPrice * cakeBalance).toFixed(2)}</Label>
        </Block>
        <Actions>
		<Button onClick={addWatchJaguarToken} size="sm" style={{ color:"#FF0000", background:"#f9d5d5", marginBottom: 0 }} mb={2}>
            + Add TERRA to <img style={{ marginLeft: 8 }} width={16} src="./images/tokens/metamask.png" alt="metamask logo" />
          </Button>
          {/* {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              fullWidth
            >
              {pendingTx
                ? TranslateString(548, 'Collecting TERRA')
                : TranslateString(999, `Harvest all (${balancesWithValue.length})`)}
            </Button>
          ) : (
            <UnlockButton fullWidth />
          )} */}
		  <DepA href="https://app.pangolin.exchange/#/swap?outputCurrency=0x9F87C6c30F4b23C7B51Aa7465A9e0A836514700D" target="_blank" rel="noreferrer">
        <DepButton mt="8px" fullWidth>Buy TERRA</DepButton>
      </DepA>
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
