import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { getAccruedLama } from 'utils/callHelpers'
import { useLamaHerd } from './useContract'
import useRefresh from './useRefresh'


const useReferrerBalance = () => {
  const [balance, setFarmsWithBalances] = useState<BigNumber>(new BigNumber(0))
  const { account } = useWallet()
  const { fastRefresh } = useRefresh()
  const lamaHerdContract = useLamaHerd()

  useEffect(() => {
    const fetchBalance = async () => {
      const result = await getAccruedLama(lamaHerdContract, account)
      setFarmsWithBalances(result)
    }

    if (account) {
      fetchBalance()
    }
  }, [account, lamaHerdContract, fastRefresh])

  return balance
}

export default useReferrerBalance
