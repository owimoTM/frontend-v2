import { MenuEntry } from '@llama/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Exchange',
    href: 'https://exchange.llamaswap.finance',
    icon: 'TradeIcon',
  },
  {
    label: 'Liquidity',
    href: 'https://exchange.llamaswap.finance/#/pool',
    icon: 'LiquidityIcon',
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'Spit farm (Coming soon)',
    icon: 'SpitIcon',
    href: '#',
  },
  {
    label: 'Referral',
    icon: 'ReferralIcon',
    href: '/referral',
  },
  {
    label: 'Audit',
    icon: 'AuditIcon',
    href: "https://docs.llamaswap.finance/#/security?id=audit"
  },
  {
    label: 'Listings',
    icon: 'ListingsIcon',
    items: [
      {
        label: 'CoinGecko',
        href: 'https://www.coingecko.com/en/coins/llamaswap'
      },
      {
        label: 'DappRadar',
        href: 'https://dappradar.com/binance-smart-chain/defi/llamaswap',
      }
    ]
  },
  {
    label: 'Chart',
    icon: 'GraphIcon',
    items: [
      {
        label: 'PooCoin',
        href: 'https://poocoin.app/tokens/0x0fc013e24ae732fcec9eb6bf8cae12782a56be7e'
      },
      {
        label: 'GoSwap',
        href: 'https://goswappcharts.web.app/?isbsc=true&tokenId=0x0FC013E24AE732fcEc9Eb6BF8CAE12782a56bE7E',
      },
      {
        label: 'DexGuru',
        href: 'https://dex.guru/token/0x0fc013e24ae732fcec9eb6bf8cae12782a56be7e-bsc',
      },
      {
        label: 'BoggedFinance',
        href: 'https://charts.bogged.finance/?token=0x0fc013e24ae732fcec9eb6bf8cae12782a56be7e',
      },
      {
        label: 'DexTools',
        href: 'https://www.dextools.io/app/pancakeswap/pair-explorer/0x078ff84da28ccf740f996e566023adb29952c33c'
      },
    ]
  },
  {
    label: 'Roadmap',
    icon: 'RoadmapIcon',
    href: 'https://docs.llamaswap.finance/#/roadmap',
  },
  {
    label: 'Feedback',
    icon: 'MegaphoneIcon',
    href: 'https://llamaswap.kampsite.co/',
  },
  {
    label: 'Docs',
    icon: 'DocsIcon',
    href: "https://docs.llamaswap.finance"
  },
  {
    label: 'Llama swap V1',
    icon: 'LamaTokenIcon',
    href: 'https://v1.llamaswap.finance',
  },
]

export default config
