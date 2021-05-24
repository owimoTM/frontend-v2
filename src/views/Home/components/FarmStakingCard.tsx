import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { provider } from 'web3-core'
import { Heading, Card, CardBody, Button, useModal } from '@llama/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import UnlockButton from 'components/UnlockButton'
import { useFarmUser } from 'state/hooks'
import { getCakeAddress } from 'utils/addressHelpers'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/farms'
import { useDispatch } from 'react-redux'
import farms from 'config/constants/farms'
import { masterchef } from 'config/constants'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import MassHarvestModal from '../MassHarvestModal'

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

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const lamaBalance = useTokenBalance(getCakeAddress())
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)
  

  const [massHarvestModal] = useModal(<MassHarvestModal max={lamaBalance} balancesWithValue={balancesWithValue} account={account} ethereum={ethereum} />)

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(542, 'Farms & Staking')}
        </Heading>
        <CardImage />
        <Block>
          <Label>{TranslateString(544, 'LAMA to Harvest')}:</Label>
          <CakeHarvestBalance />
        </Block>
        <Block>
          <Label>{TranslateString(546, 'LAMA in Wallet')}:</Label>
          <CakeWalletBalance />
        </Block>
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={massHarvestModal}
              fullWidth
            >
              {pendingTx
                ? TranslateString(548, 'Collecting LAMA')
                : TranslateString(532, `Mass harvest & restake (${balancesWithValue.length})`)}
            </Button>
          ) : (
            <UnlockButton fullWidth />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
