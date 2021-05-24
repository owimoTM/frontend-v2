import BigNumber from 'bignumber.js'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Modal, Checkbox } from '@llama/uikit'
import ModalActions from 'components/ModalActions'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
import { FarmConfig } from 'config/constants/types'
import { useMassHarvest } from 'hooks/useHarvest'
import { useFarmFromSymbol, useFarmUser } from 'state/hooks'
import styled from 'styled-components'
import Spacer from 'components/Spacer'
import ModalInput from 'components/ModalInput'
import { getFullDisplayBalance } from 'utils/formatBalance'
import farms from 'config/constants/farms'
import { useApprove } from 'hooks/useApprove'
import { farmsConfig } from 'config/constants'
import { getAddress } from 'utils/addressHelpers'
import { getContract } from 'utils/erc20'
import useRefresh from 'hooks/useRefresh'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync } from 'state/actions'



interface DepositModalProps {
  balancesWithValue: FarmWithBalance[],
  onDismiss?: () => void,
  max: BigNumber,
  account: string,
  ethereum?: provider
}

export interface FarmWithBalance extends FarmConfig {
  balance: BigNumber
}

const InputsContainer = styled.div``

const SubTitle = styled.div`
  font-weight: bold; 
  color: #E4BF6E;
`

const MassHarvestModal: React.FC<DepositModalProps> = ({ max, balancesWithValue, onDismiss, account,ethereum  }) => {
  const { tokenAddresses } = useFarmFromSymbol(farms[0].lpSymbol)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const tokenAddress = getAddress(tokenAddresses);
  const [autoStake, setAutoStake] = useState(true)
  const [extraStake, setExtraStake] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { allowance } = useFarmUser(0)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])
  
  

  const ids = balancesWithValue.map(b => b.pid);
  const names = balancesWithValue.map(b => b.lpSymbol);

  const updateAutoStake = () => {
    setAutoStake(!autoStake);
    setExtraStake("");
  }
  const handleExtraStakeChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setExtraStake(e.currentTarget.value)
    },
    [setExtraStake],
  )

  const handleSelectMax = useCallback(() => {
    setExtraStake(fullBalance)
  }, [fullBalance, setExtraStake])

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, tokenAddress);
  }, [ethereum, tokenAddress])

  const { onApprove } = useApprove(lpContract)
  const { onMassHarvest } = useMassHarvest(ids, autoStake, extraStake);

  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      if (account) {
        await dispatch(fetchFarmUserDataAsync(account))
      }
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, account, dispatch])

  return (
    <Modal title="Mass Harvest &amp; Restake" onDismiss={onDismiss}>
      <SubTitle>Harvest all and restake in only one transaction!</SubTitle>
      <Spacer />
      <div>Pools and farms to harvest:</div>
      <div>{names.join(", ")}</div>
      <Spacer />
      <InputsContainer>
        <label htmlFor="autoStake">
          <Checkbox
            name="autoStake"
            checked={autoStake && isApproved}
            onChange={updateAutoStake}
            id="autoStake"
            disabled={!isApproved}
          />
          <span style={{ marginLeft: 8 }}>Auto Restake</span>
          {!isApproved ? <Button mt="8px" fullWidth disabled={requestedApproval} onClick={handleApprove}>
            {TranslateString(758, 'Approve Contract')}
          </Button> : ""}
        </label>
        <Spacer />
        {autoStake && isApproved && (
          <ModalInput
            value={extraStake}
            onSelectMax={handleSelectMax}
            onChange={handleExtraStakeChange}
            max={fullBalance}
            symbol="LAMA"
            inputTitle="Add extra stake"
          />)}
      </InputsContainer>
      <ModalActions>
        <Button fullWidth variant="secondary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button
          fullWidth
          disabled={pendingTx || !ids.length || !isApproved}
          onClick={async () => {
            setPendingTx(true)
            await onMassHarvest()
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default MassHarvestModal

