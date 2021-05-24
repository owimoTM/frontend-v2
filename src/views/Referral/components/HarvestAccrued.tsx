import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Button, Card, CardBody, Heading, Text } from '@llama/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { getRefs } from 'utils/callHelpers'
import { getContract } from 'utils/web3'
import { useLamaHerd } from 'hooks/useContract'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from 'views/Home/components/CakeHarvestBalance'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import { useReferralHarvest } from 'hooks/useHarvest'
import { usePriceCakeBusd } from 'state/hooks'
import useReferrerBalance from 'hooks/useReferrerBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import LamaRefFeesBalance from 'views/Referral/components/LamaRefFeesBalance'


const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/lama-right-swap-tr.svg');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.div`
  margin-bottom: 16px;
  margin-left: 5px;
  width: 64px;
  height: 64px;
  background-image: url(/images/lama-token.svg);
  background-size: 145px;
  background-position: center center;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const HarvestAccrued: React.FC = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet() 
  const { onRefFeesHarvest } = useReferralHarvest()

  const accruedBalance = useReferrerBalance() ?? new BigNumber(0);
  
  const feesBalance = getBalanceNumber(accruedBalance);
  const earningsBusd  = new BigNumber(feesBalance).multipliedBy(usePriceCakeBusd()).toNumber()

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          Rewards from your herd
        </Heading>
        <CardImage />
        <Block>
          <Label>LAMA accrued</Label>
          <LamaRefFeesBalance 
          fees={feesBalance}
          earnings={earningsBusd} />
        </Block>
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={pendingTx || earningsBusd === 0}
              onClick={async () => {
                setPendingTx(true)
                await onRefFeesHarvest()
                setPendingTx(false)                
              }}
              fullWidth
            >
              {pendingTx
                ? 'Collecting LAMA'
                : `Withdraw`}
            </Button>
          ) : (
            <UnlockButton fullWidth />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default HarvestAccrued
