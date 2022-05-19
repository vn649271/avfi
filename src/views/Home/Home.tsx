import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import CakeContracts from './components/CakeContracts'
import FarmStakingCard2 from './components/FarmStakingCard2'
import FarmStakingCard from './components/FarmStakingCard'
import LotteryCard from './components/LotteryCard'
import Timer from './components/Timer'
import CakeStats from './components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import TwitterCard from './components/TwitterCard'


const BadgeFlex = styled.div`
align-items: center;
display: flex;
  justify-content: center;
  margin-bottom: 30px;
`

const Tag1 = styled.a`
  display: inline-block !important;
`

const Hero = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 15px;
  margin-top: 30px;
  padding-top: 116px;
  text-align: center;
  position: relative;
  z-index:2;
  border-radius: 30px;
  
  &:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.1;
    background-image: url('/images/egg/vaults-hero.png');
    background-repeat: no-repeat;
    background-position: top center;    
    border-radius: 30px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    
    padding-top: 0;
    position: relative;
    z-index: 2;
    height: 120px;

    &:before {
      content: ' ';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 1;
      background-image: url('/images/egg/logo-princi.png');
    background-position: center;
    background-repeat: no-repeat;
    }
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (

<>
  
    <Page>
      <Hero>

       {/* </Heading> */}
      {/*  <Text color="#FFFFFF">{TranslateString(999, 'Avalanche based AMM and Yield Farm protocol. Non-farmers just don't get it!™️')}</Text> */}
      </Hero>
<BadgeFlex>
	<a target="_blank" rel="noreferrer" href="https://jagosafer.io/avaterra-finance"><img width={250} src="./images/egg/kyc_jago.png" alt="jago kyc" /></a> 
        <a target="_blank" rel="noreferrer" href="https://rugdoc.io/project/ava-terra-finance/"><img width={250} src="./images/egg/rug-badge.png" alt="rugdoc badge" /></a>
        <a target="_blank" rel="noreferrer" href="https://rugdoc.io/project/ava-terra-finance/"><img width={250} src="./images/egg/liq-badge.png" alt="rugdoc liq locked" /></a>
        <a target="_blank" rel="noreferrer" href="https://paladinsec.co/projects/avaterra-finance/"><img width={250} src="./images/egg/pala-badge.png" alt="paladin audit" /></a>
 {/* <a target="_blank" rel="noreferrer" href="https://avax.farmscan.io/address/0x74f53e67d68a348611979e3012edf9781c437529"><img width={275} src="https://avax.farmscan.io/img/farmscan-avax-badge.2d7e7cd5.svg" alt="farmscan avaterra" /></a> */}
      </BadgeFlex>
      <div>
        <Cards>
          <FarmStakingCard />
          <TwitterCard/>
<CakeStats/>
	   <FarmStakingCard2 />
          <TotalValueLockedCard />
           <CakeContracts />
          
        </Cards>
      </div>
    </Page>
  </>
  )
}

export default Home
