import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@llama/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import NewsCard from './components/NewsCard'

const Hero = styled.div`
align-items: center;
  background-image: url('/images/lama-glasses.svg');
  background-repeat: no-repeat;
  background-position: top center;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 32px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  text-align: center; padding-top:0px;



  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/lama-glasses.svg'), url('/images/lama-right.svg');
    background-position: 10% center, right center;
    background-size: auto,230px;
    height: 165px;
    padding-top: 0;
  }


`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

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

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" mb="24px" color="secondary">
          {TranslateString(576, 'LlamaSwap')}
        </Heading>
        <Text>{TranslateString(578, 'Where the coolest llamas go yield farming, on Binance Smart Chain.')}</Text>
      </Hero>
      <div>
        <Cards>
          <FarmStakingCard />   
          <NewsCard />       
        </Cards>
        {/* <CTACards>
          <EarnAPYCard />
          <EarnAssetCard />          
        </CTACards> */}
        <Cards>
          <CakeStats />
          <TotalValueLockedCard />
        </Cards>
      </div>
    </Page>
  )
}

export default Home
