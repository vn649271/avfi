import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Heading } from '@pancakeswap-libs/uikit'
import { SECONDS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePools } from 'state/hooks'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import Coming from './components/Coming'
import PoolCard from './components/PoolCard'
import PoolTabButtons from './components/PoolTabButtons'
import Divider from './components/Divider'

const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const { account } = useWallet()
  const pools = usePools(account)

  const poolsWithApy = pools.map((pool) => {
    const isBnbPool = pool.poolCategory === PoolCategory.BINANCE

    const totalRewardPricePerYear = new BigNumber(pool.rewardTokenPrice).times(pool.tokenPerTime).times(SECONDS_PER_YEAR).div(new BigNumber(10).pow(18-pool.rewardTokenDecimals))
    const totalStakingTokenInPool = new BigNumber(pool.stakingTokenPrice).times(getBalanceNumber(pool.totalStaked,pool.stakingTokenDecimals)).div(new BigNumber(10).pow(18-pool.stakingTokenDecimals))
    const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
    return {
      ...pool,
      isFinished: new Date().getTime() > pool.endTime * 1000,
      apy,
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)

  return (
    <Page>
      <Hero>
        <div style={{textAlign: "center"}}>
          <Heading as="h1" size="xxl" mb="16px">
           Dividends
          </Heading>
          <ul>
            <li>No Fees</li>
            <li>No Risks</li>
            <li>You can unstake at any time</li>
          </ul>
        </div>
      </Hero>
      <PoolTabButtons />
      <Divider />
      <FlexLayout>
        <Route exact path={`${path}`}>
          <>
            {orderBy(openPools, ['sortOrder']).map((pool) => (
              <PoolCard key={pool.sousId} pool={pool} />
            ))}
           
          </>
        </Route>
        <Route path={`${path}/history`}>
          {orderBy(finishedPools, ['sortOrder']).map((pool) => (
            <PoolCard key={pool.sousId} pool={pool} />
          ))}
        </Route>
      </FlexLayout>
    </Page>
  )
}

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-left: auto;
  margin-right: auto;
  max-width: 250px;
  padding: 48px 0;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    li {
      margin-bottom: 4px;
    }
  }
`

export default Farm
