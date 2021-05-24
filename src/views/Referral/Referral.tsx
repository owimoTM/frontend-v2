import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components';
import { BaseLayout } from '@llama/uikit'
import Page from 'components/layout/Page'


import ReferralPanel from './components/Refinfo'
import ReferralTable from './components/ReferralTable'
import HarvestAccrued from './components/HarvestAccrued';


export interface FarmsProps {
  tokenMode?: boolean
}
const Cards1 = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 12;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 12;
    }
  }
`
const Cards2 = styled(BaseLayout)`
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

const Farms: React.FC<FarmsProps> = (farmsProps) => {

  
  return (
    <Page>
      <Cards1>
        <ReferralPanel />
      </Cards1>
      <Cards2>
        <HarvestAccrued />

        <ReferralTable />
      </Cards2>
    </Page>
  )
}


const Hero2 = styled.div`
iframe{
  width: 1px;
  min-width: 100%;
   overflow: hidden; 
   min-height: calc(100vh - 66px);;
}
`

export default Farms
