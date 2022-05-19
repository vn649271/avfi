import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'
import { useTotalValue } from '../../../state/hooks'
import CardValue from './CardValue'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;

  opacity: 1;
  background-image: url('/images/egg/tvl.png');
  background-repeat: no-repeat;
  background-position: top right;

  
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  // const data = useGetStats()
  const totalValue = useTotalValue();
  // const tvl = totalValue.toFixed(2);

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading size="xxl" mb="13px" color="#FFFFFF">
          {TranslateString(999, 'TVL')}
		  <Heading size="md" mb="1px" color="#FFFFFF">
          {TranslateString(999, '(Total Value Locked)')}
        </Heading>
        </Heading>
        <>
          {/* <Heading size="xl">{`$${tvl}`}</Heading> */}
          {/* <Heading size="xl"> */}
            <CardValue value={totalValue.toNumber()} prefix="$" decimals={2}/>
          {/* </Heading> */}
          <Text color="#E9EAEB">{TranslateString(999, 'Across all Farms and Pools')}</Text>
        </>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
