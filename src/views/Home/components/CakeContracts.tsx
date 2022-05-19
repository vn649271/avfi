import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'

const StyledCakeContracts = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 13px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CakeContracts = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms();
  const eggPrice = usePriceCakeBusd();
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  const marketCap = eggPrice.times(circSupply);

  let terraPerSec = 0;
  if(farms && farms[0] && farms[0].terraPerSec){
    terraPerSec = new BigNumber(farms[0].terraPerSec).div(new BigNumber(10).pow(18)).toNumber();
  }

  return (
    <StyledCakeContracts>
      <CardBody>
        <Heading size="xl" mb="24px" color="#FFFFFF">
          {TranslateString(999, 'Contracts')}
        </Heading>
        <Row>
          <Text fontSize="13px" color="#FFFFFF">{TranslateString(999, '$Terra')}</Text>
          <a target="_blank" rel="noreferrer noopener" href="https://cchain.explorer.avax.network/address/0x9F87C6c30F4b23C7B51Aa7465A9e0A836514700D/contracts" color="#fb2141">0x9F87C6c30F4b23C7B51Aa7465A9e0A836514700D</a> {/* XXXXCORN */}
        </Row>
        <Row>
          <Text fontSize="13px" color="#FFFFFF">{TranslateString(999, 'MasterChef')}</Text>
        <a target="_blank" rel="noreferrer noopener" href="https://cchain.explorer.avax.network/address/0x74F53e67D68A348611979e3012EDf9781C437529/contracts" color="#fb2141">0x74F53e67D68A348611979e3012EDf9781C437529</a> {/* XXXXMASTERCHEF */}
        </Row>
        <Row>
          <Text fontSize="13px" color="#FFFFFF">{TranslateString(999, 'Timelock')}</Text>
        <a target="_blank" rel="noreferrer noopener" href="https://cchain.explorer.avax.network/address/0xBd9fE91b4c402097573AFeB58EB4163F0Ec843a0/contracts" color="#fb2141">0xBd9fE91b4c402097573AFeB58EB4163F0Ec843a0</a> {/* XXXXTIMELOCK */}
        </Row>
        <Row>
          <Text fontSize="13px" color="#FFFFFF">{TranslateString(999, 'Treasury')}</Text>
        <a target="_blank" rel="noreferrer noopener" href="https://cchain.explorer.avax.network/address/0x99Fb7c32020680AB5bea10061f4f1AD0e44d8690" color="#fb2141">0x99Fb7c32020680AB5bea10061f4f1AD0e44d8690</a> {/* XXXXTIMELOCK */}
        </Row>
      </CardBody>
    </StyledCakeContracts>
  )
}

export default CakeContracts
