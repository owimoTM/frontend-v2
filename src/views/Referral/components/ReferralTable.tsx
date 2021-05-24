import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Text } from '@llama/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useGetRefsAddresses from 'hooks/useReferralHerd'

const Hero = styled.div`
  align-items: center;


  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    min-height: 376px;
    padding-top: 0;
  }
`
const StyledFarmStakingCard = styled(Card)`
background-image: url('/images/lamaHerd.png');
background-repeat: no-repeat;
background-position: top center;
background-size: 130%;
`

const AddressContainer = styled.div`
  height: 15em;
  overflow-y: auto;
`

const ReferralTable: React.FC = () => {
  const refTable = useGetRefsAddresses();
  
  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="xl" mb="24px">{`Your herd: ${refTable.length} ${refTable.length === 1 ? "llama" : "llamas"}`}</Heading>
        <AddressContainer>
          {refTable.map(function (k) {
            return (
              <Text key={k}>
                <a rel="noreferrer" target="_blank" href={`https://bscscan.com/address/${k}`}>
                  {' '}
                  {k}
                </a>{' '}
              </Text>
            )
          })}
        </AddressContainer>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default ReferralTable
