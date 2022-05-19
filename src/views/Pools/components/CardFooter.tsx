import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import { ChevronDown, ChevronUp } from 'react-feather'
import Balance from 'components/Balance'
import { CommunityTag, CoreTag, BinanceTag } from 'components/Tags'
import { PoolCategory } from 'config/constants/types'
import CardValue from 'views/Home/components/CardValue'

const tags = {
  [PoolCategory.BINANCE]: BinanceTag,
  [PoolCategory.CORE]: CoreTag,
  [PoolCategory.COMMUNITY]: CommunityTag,
}

interface Props {
  projectLink: string
  totalStaked: BigNumber
  timeRemaining: number
  isFinished: boolean
  timeUntilStart: number
  poolCategory: PoolCategory
  totalStakedPrice: BigNumber,
  totalRemained: number,
  rewardTokenName: string
}

const StyledFooter = styled.div<{ isFinished: boolean }>`
  border-top: 1px solid ${({ theme }) => (theme.isDark ? '#524B63' : '#E9EAEB')};
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled2' : 'primary2']};
  padding: 24px;
`

const StyledDetailsButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  font-weight: 600;
  height: 32px;
  justify-content: center;
  outline: 0;
  padding: 0;
  &:hover {
    opacity: 0.9;
  }

  & > svg {
    margin-left: 4px;
  }
`

const Details = styled.div`
  margin-top: 24px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
`

const FlexFull = styled.div`
  flex: 1;
`
const Label = styled.div`
  font-size: 14px;
`
const TokenLink = styled.a`
  font-size: 15px;
  line-heigth: 2em;
  text-decoration: none;
  color: ${({ theme }) => (theme.colors.secondary)};
`

const CardFooter: React.FC<Props> = ({
  projectLink,
  totalStaked,
  timeRemaining,
  isFinished,
  timeUntilStart,
  poolCategory,
  totalStakedPrice,
  totalRemained,
  rewardTokenName
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const TranslateString = useI18n()
  const Icon = isOpen ? ChevronUp : ChevronDown

  const handleClick = () => setIsOpen(!isOpen)
  const Tag = tags[poolCategory]

  const secondsToDhms = (seconds:number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);

    const dDisplay = d > 0 ? d + (d === 1 ? " day " : " days ") : "";
    const hDisplay = h > 0 ? h + (h === 1 ? " h " : " h ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? " m " : " m ") : "";
    const sDisplay = s > 0 ? s + (s === 1 ? " s" : " s") : "";
    return dDisplay.concat(hDisplay).concat(mDisplay).concat(sDisplay);
  }

  return (
    <StyledFooter isFinished={isFinished}>
      <Row>
        <FlexFull>
          <Tag />
        </FlexFull>
        <StyledDetailsButton onClick={handleClick}>
          {isOpen ? 'Hide' : 'Details'} <Icon />
        </StyledDetailsButton>
      </Row>
      {isOpen && (
        <Details>
          <Row style={{ marginBottom: '1px', alignItems: 'left' }}>
            <FlexFull>
              <Label>
                Total Staked
              </Label>
            </FlexFull>
            <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(totalStaked)} />( <CardValue fontSize="14px" value={getBalanceNumber(totalStakedPrice)} decimals={3} prefix="$" color={isFinished ? "disabled" : "text"} /> )
          </Row>
         
          <Row style={{ marginBottom: '4px' }}>
            <FlexFull>
              <Label>
                {rewardTokenName} Remaining
              </Label>
            </FlexFull>
            <Balance fontSize="14px" isDisabled={isFinished} value={totalRemained} />
          </Row>
          {timeUntilStart > 0 && (
            <Row>
              <FlexFull>
                <Label>{TranslateString(410, 'Start')}:</Label>
              </FlexFull>
              <Label>
                {secondsToDhms(timeUntilStart)}
              </Label>
            </Row>
          )}
          {timeUntilStart === 0 && timeRemaining > 0 && (
            <Row>
              <FlexFull>
                <Label>{TranslateString(410, 'End')}:</Label>
              </FlexFull>              
              <Label>
                {secondsToDhms(timeRemaining)}
              </Label>
            </Row>
          )}
<div style={{ marginTop: '6px' }}>
        <TokenLink href={projectLink} target="_blank">
           Website Project
          </TokenLink>
</div>
        </Details>
      )}
    </StyledFooter>
  )
}

export default React.memo(CardFooter)
