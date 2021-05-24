import React from 'react'
import { Text } from '@llama/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import useAllEarnings from 'hooks/useAllEarnings'

import useReferrerBalance from 'hooks/useReferrerBalance'

import styled from 'styled-components'
import CardValue from '../../Home/components/CardValue'
import CardBusdValue from '../../Home/components/CardBusdValue'

const Block = styled.div`
  margin-bottom: 24px;
}
`

const LamaRefFeesBalance = ({ fees, earnings}) => {
  const TranslateString = useI18n()
  
  const { account } = useWallet()
  
  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '54px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return (
    <Block>      
      <CardValue value={fees} decimals={4} fontSize="24px" lineHeight="1.5" />
      <CardBusdValue value={earnings} />
    </Block>
  )
}

export default LamaRefFeesBalance
