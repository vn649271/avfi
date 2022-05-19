import React from 'react'
import styled from 'styled-components'
import { Heading, Text, Button } from '@pancakeswap-libs/uikit'
import Container from 'components/layout/Container'
import useI18n from 'hooks/useI18n'
import Timer from '../../Home/components/Timer'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: ${({ theme }) => "#FFFFFF"};
  alignItems: center;
  justifyContent: center;
  margin-bottom: 15px;
  margin-top: 40px;
`

const Tag1 = styled.a`
  display: inline-block !important;
`

const DepA = styled.a`
  display: inline-block !important;
  margin-left: 370px;
`

const DepButton = styled(Button)`
  background-color: #FFFFFF;
	color: #fb2141;
  &:hover {
	background-color: #fb2141;
	color: #FFFFFF;
  }
`

const Blurb = styled(Text)`
  color: #FFFFFF;
  font-size: 20px;
  font-weight: 600;
`

let StyledHero


const Hero = ({tokenMode,dividendsMode}) => {
  const TranslateString = useI18n()
  if (!dividendsMode) {

StyledHero = styled.div`
  background-image: url('/images/egg/banner-bg.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 466px;
  padding-bottom: 438px;
  padding-top: 44px;
  margin-bottom: -425px;
`

  return (
    <StyledHero>
      <Container>
         <Heading as="h1" size="xx1" mb="16px" color="#fb2141" >{
            TranslateString(999, 'NO DEPOSIT! AVATerra token contract has been exploited, masterchef is safe, funds are safe please withdraw')} {/* 'Yield Farming starts on Sep 28, 8:00PM UTC' */}
       </Heading>
	<Timer />
        {/* <Tag1 target="_blank" rel="noreferrer" href="https://app.aave.com/markets"> */}
      
        {/* </Tag1>
        <Heading as="h1" size="lg" mb="12px" color="#fb3321" >
          {TranslateString(999, 'Yield Farming started!')}
        </Heading>
        <Text color="#FFFFFF" >{TranslateString(999, 'On Sep 28, 8:00PM UTC')}
        </Text> */}
        <Title color="#FFFFFF" style={{ textAlign: 'center' }}>{
          !tokenMode ?
            TranslateString(10002, 'Stake tokens to earn TERRA')
            :
            TranslateString(999, 'Stake LP tokens to earn TERRA')
          
        }</Title>
		<DepA href="https://docs.avaterra.finance/tokenomics/fee-buyback-burn" target="_blank" rel="noreferrer">
        <DepButton size="sm" >Deposit Fees Usage</DepButton>
		</DepA>
      </Container>
    </StyledHero>
  )
}

StyledHero = styled.div`
  background-image: url('/images/egg/banner-bg1.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 630px;
  padding-bottom: 47px;
  padding-top: 44px;
  margin-bottom: -32px;
`

  return (
    <StyledHero>
      <Container>
        {/* <Heading as="h1" size="lg" mb="12px" color="#fb3321" >
          {TranslateString(999, 'Yield Farming started!')}
        </Heading>
        <Heading as="h1" size="sm" mb="27px" color="#fb3321" >
          {TranslateString(999, 'At block #19070000')}
        </Heading> */}
        <Title color="#FFFFFF" style={{ textAlign: 'center' }}>{
            TranslateString(999, 'TERRA Dividends')
          
        }</Title>
        <Blurb color="#FFFFFF" style={{ textAlign: 'center' }}>{TranslateString(999, 'Stake TERRA to earn new tokens')}</Blurb>
      </Container>
    </StyledHero>
  )
}


export default Hero
