import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Image, Heading } from '@llama/uikit'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'

export interface FarmsProps {
  tokenMode?: boolean
}

const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const [removed, setRemoved] = useState<boolean>(false)
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { tokenMode } = farmsProps;

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)

  const activeFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, remove: boolean) => {
      // const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
        //   return farm
        // }
        const cakeRewardPerBlock = new BigNumber(farm.lamaPerBlock || 1).times(new BigNumber(farm.poolWeight)).div(new BigNumber(10).pow(18))
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = cakePrice.times(cakeRewardPerYear);

        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0);

        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          totalValue = totalValue.times(bnbPrice);
        }

        if (totalValue.comparedTo(0) > 0) {
          apy = apy.div(totalValue);
        }

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          removed={remove}
          bnbPrice={bnbPrice}
          cakePrice={cakePrice}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [bnbPrice, account, cakePrice, ethereum],
  )

  const pageTitle = tokenMode ? TranslateString(676, 'Pools') : TranslateString(674, 'Farms');
  const toggleRemoved = (index) => setRemoved(index === 1);
  return (
    <Page>
      <Hero2>
        <Hero>
          <div>
            <Heading as="h1" size="xl" color="secondary" mb="50px" style={{ textAlign: 'center' }}>
              {pageTitle}
            </Heading>
            <Heading as="h2" size="md" color="secondary" mb="50px" style={{ textAlign: 'center' }}>
            {TranslateString(10000, 'Deposit Fees (if any) will be used for LAMA buybacks and burns')}
            </Heading>              
          </div>
          {tokenMode ? <PoolLamaImage/> :<FarmLamaImage/>}
        </Hero>
        <FarmTabButtons stackedOnly={stakedOnly} setStackedOnly={setStakedOnly} toggleRemoved={toggleRemoved} removed={removed}/>
      </Hero2>
      <div>
        <Divider />
        {/* <Heading as="h2" size="xl"  color="secondary" mb="50px" style={{ textAlign: 'center' }}>
        {TranslateString(999999, 'OPENING SOON!')}
        </Heading> */}
        <FlexLayout>          
            {stakedOnly ? farmsList(stakedOnlyFarms, removed) : farmsList(removed ? inactiveFarms : activeFarms, false)}          
        </FlexLayout>
      </div>
    </Page>
  )
}

const PoolLamaImage = styled.div`
width: 100%;
background: url("images/pool-comp.svg") center no-repeat;
height:120%;
`
const FarmLamaImage = styled.div`
width: 100%;
background: url("images/lama-farm.svg") center no-repeat;
height:120%;
border-radius: 56px;
background-size:contain;
`

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  border-radius:32px;
  display: grid;
  grid-template-columns: 2fr;
  margin-left: auto;
  margin-right: auto;
  h2{
    margin-bottom:10px;
  }
  padding: 0px 20px;
  margin-bottom:20px;
  img {
    height: auto;
    max-width: 100%;
  }
  h1{
    margin-bottom: 10px;
  }
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    max-width: none;
    background-color: ${({ theme }) => theme.colors.card};
      margin-bottom: 30px;
    grid-gap: 32px;
    h1{
      margin-bottom: 30px;
    }

  }
  }
`

const Hero2 = styled.div`
align-items: center;
color: ${({ theme }) => theme.colors.primary};

border-radius:32px;

margin-left: auto;
margin-right: auto;
padding-top: 30px;
padding-bottom: 20px;
padding-left: 20px;
padding-right: 20px;

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  font-size: 16px;
  li {
    margin-bottom: 4px;
    color:#3e3d43;
  }
}
img {
  height: auto;
  max-width: 100%;
}
@media (min-width: 576px) {
  max-width: none;
  
  margin-bottom:20px;
  background-color: ${({ theme }) => theme.colors.card};
}
`

export default Farms
