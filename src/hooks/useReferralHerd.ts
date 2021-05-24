import { useEffect, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { getRefs } from 'utils/callHelpers'
import useRefresh from './useRefresh'
import { useLamaHerd } from './useContract'

const useGetRefsAddresses = () => {
    const [refTable, setRefTable] = useState([])
    const { account } = useWallet()
    const lamaHerdContract = useLamaHerd()
    const { fastRefresh } = useRefresh()

    useEffect(() => {
        async function fetchData() {
            const array = await getRefs(lamaHerdContract, account)
            setRefTable(array)
        }
        if (account) {
            fetchData()
        }
    }, [account, lamaHerdContract, fastRefresh])

    return refTable
}

export default useGetRefsAddresses

