import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useLocation } from "react-router-dom";


export interface FarmsProps {
  tokenMode?: boolean
}


const Farms: React.FC<FarmsProps> = (farmsProps) => {

  const qs = useLocation().search;
  let src = "https://poocoin.app/tokens/0x0fc013e24ae732fcec9eb6bf8cae12782a56be7e";
  switch (qs) {
      case "?goswap":
      src = "https://goswappcharts.web.app/?isbsc=true&tokenId=0x0FC013E24AE732fcEc9Eb6BF8CAE12782a56bE7E";
      break;
    default:
      break;
  }
  return (
    <div>      
      <Hero2>
        <iframe title="priceChart" src={src} />
      </Hero2>
    </div>
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
