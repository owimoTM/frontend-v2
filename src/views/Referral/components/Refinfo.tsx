import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card, CopyToClipboard } from '@llama/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'

const Hero = styled.div`
  align-items: center;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
 
  padding-bottom: 20px;
  padding-top: 30px;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/lama01l.png');
    background-position: -60px center;
    height: 180px;
    padding-top: 0;
    font-size: 1.2em;
  }
`
 
const StyledText = styled.div``
const WrappedText = styled.div`{
  overflow-wrap:anywhere;
}`

const useFetch = (uri: string) => {
  const [data, setData] = useState(null)

  // empty array as second argument equivalent to componentDidMount
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(uri)

      const json = await response.json()

      setData(json.result)
    }
    fetchData()
  }, [uri])

  return data
}

const ReferralPanel: React.FC = () => {
  const { account } = useWallet()

  const codex: string = useFetch(`https://app.llamaswap.finance/toCode/${account}`)
  const uriLink = `https://llamaswap.finance?lama-friend=${codex}`;

  return (
    <Card>
      <Hero>
        <StyledText>Earn 2% on top of your Llama friends earnings!</StyledText>
        <br />
        <StyledText>Use this link to invite your friends:</StyledText>
        <br />
        <WrappedText>
        <CopyToClipboard toCopy={uriLink}>{uriLink}</CopyToClipboard>
        </WrappedText>
      </Hero>
    </Card>
  )
}

export default ReferralPanel
