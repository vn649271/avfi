import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Fantom Terra',
    icon: 'SunIcon',
    href: 'https://app.fanterra.finance/',
 },
  {
    label: 'Future Investor Fund',
    icon: 'VaultsIcon',
    href: 'https://docs.avaterra.finance/tokenomics/platetectonics',
 },
  {
    label: 'Deposit Fee Usage',
    icon: 'VaultsIcon',
    href: 'https://docs.avaterra.finance/tokenomics/fee-buyback-burn',
 },
  {
    label: 'Bridges',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Evodefi',
        href: 'https://bridge.evodefi.com/?token=USDC', 
      },
      {
        label: 'xPollinate',
        href: 'https://www.xpollinate.io', 
      },
    ],
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://app.pangolin.exchange/#/swap?outputCurrency=0x9F87C6c30F4b23C7B51Aa7465A9e0A836514700D', 
      },
      {
        label: 'Liquidity',
        href: 'https://app.pangolin.exchange/#/add/0x9F87C6c30F4b23C7B51Aa7465A9e0A836514700D', 
      },
    ],
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
     label: 'Dividends', 
     icon: 'BondsIcon',
     href: '/dividends',
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
	{
	label: 'CoinMarketCap',
	href: 'https://coinmarketcap.com/currencies/avaterra/',
	},
	{
	label: 'CoinGecko',
	href: 'https://www.coingecko.com/en/coins/avaterra',
	},
      {
        label: 'Pangolin',
        href: 'https://info.pangolin.exchange/#/token/0x9f87c6c30f4b23c7b51aa7465a9e0a836514700d', // XXXXCORN
      },
       {
        label: 'ChartEx',
        href: 'https://chartex.pro/chart?symbol=AVAX_PANGOLIN%3ATERRA%2FUSDCe.0x5dC964D72bbB9220F6E36316aef4D2D1554bA610&interval=60&theme=dark', // XXXXCORN
      },
	{
	label: 'DexGuru',
	href: 'https://dex.guru/token/0x9F87C6c30F4b23C7B51Aa7465A9e0A836514700D-avalanche',
	},
	{
	label: 'Nomics',
	href: 'https://nomics.com/assets/terra2-avaterra',
	},
    ],
  },
{
    label: 'Audit',
    icon: 'AuditIcon',
    items: [
      {
        label: 'Paladin Audit',
        href: 'https://paladinsec.co/projects/avaterra-finance/',
      },
    ],
  },
 {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'VFAT',
        href: 'https://vfat.tools/avax/avaterra/',
      },
      {
        label: 'Github',
        href: 'https://github.com/AVATerra/', // XXXXGITHUB
      }, 
      {
        label: 'Docs',
        href: 'https://docs.avaterra.finance', // XXXXGITBOOK
      }, 
    ],
  },
  {
     label: 'Terra in Polygon (Soon)', // XXXXSOON
     icon: 'TicketIcon',
     href: 'https://t.me/avaterra',
  },
  {
     label: 'Terra Vaults (Soon)', // XXXXSOON
     icon: 'TicketIcon',
     href: 'https://t.me/avaterra',
  },
]

export default config
