import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

export const lpSymbols = {
  "LAMA-BUSD LP": "LAMA-BUSD LP V2",
  "BNB-BUSD LP": "BNB-BUSD LP V2"
};

const farms: FarmConfig[] = [
  {
    pid: 0,
    isTokenOnly: true,
    lpSymbol: 'LAMA',
    lpAddresses: {
      97: '0x3eA39d6BFf1Dca5D9dD8590a512ea171a01d3E2C',
      56: '0xC269f730dDb99c819544B18fb6B5d4d6541FdF7e', // LAMA-BUSD LP
    },
    tokenSymbol: 'LAMA',
    tokenAddresses: {
      97: '0x0572B462Bd3Ba9C5a1EbB69e6C837a668f683baf',
      56: '0x0FC013E24AE732fcEc9Eb6BF8CAE12782a56bE7E',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 1,
    lpSymbol: lpSymbols["LAMA-BUSD LP"],
    lpAddresses: {
      97: '0x3eA39d6BFf1Dca5D9dD8590a512ea171a01d3E2C',
      56: '0xC269f730dDb99c819544B18fb6B5d4d6541FdF7e',
    },
    tokenSymbol: 'LAMA',
    tokenAddresses: {
      97: '0x0572B462Bd3Ba9C5a1EbB69e6C837a668f683baf',
      56: '0x0FC013E24AE732fcEc9Eb6BF8CAE12782a56bE7E',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 2,
    lpSymbol: 'LAMA-BNB LP V2',
    lpAddresses: {
      97: '0xDf47FA68733Ded4e835d92CAA0A2Fb49d63b4Fac',
      56: '0x29aa31907c0cb2ceBeb2BdeC902fb234f41F9D93',
    },
    tokenSymbol: 'LAMA',
    tokenAddresses: {
      97: '0x0572B462Bd3Ba9C5a1EbB69e6C837a668f683baf',
      56: '0x0FC013E24AE732fcEc9Eb6BF8CAE12782a56bE7E',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 3,
    isTokenOnly: true,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '0x9339e6cedDB34E91b47e684bC85D86D6270F825A',
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '0x29e10bFf330065228B1A3700C0D79ff52Cf51688',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'CAKE-BNB LP V2',
    lpAddresses: {
      97: '0x9339e6cedDB34E91b47e684bC85D86D6270F825A',
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '0x29e10bFf330065228B1A3700C0D79ff52Cf51688',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 5,
    lpSymbol: 'ETH-BNB LP V2',
    lpAddresses: {
      97: '',
      56: '0x74E4716E431f45807DCF19f284c7aA99F18a4fbc',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '',
      56: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 6,
    lpSymbol: 'USDT-BNB LP V2',
    lpAddresses: {
      97: '',
      56: '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE',
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      97: '',
      56: '0x55d398326f99059ff775485246999027b3197955',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 7,
    lpSymbol: 'DAI-BUSD LP V2',
    lpAddresses: {
      97: '',
      56: '0x66FDB2eCCfB58cF098eaa419e5EfDe841368e489',
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      97: '',
      56: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 8,
    lpSymbol: lpSymbols["BNB-BUSD LP"],
    lpAddresses: {
      97: '0x49Bc29C0fdb17a04B3DB8e1A4254933df1f4C593',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0xA726218936C83A5144B6b419C654828BF24767F5',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
]

export default farms
