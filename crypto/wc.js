import { WalletConnectWallet, WalletConnectChainID } from '@tronweb3/walletconnect-tron';
export const wallet = new WalletConnectWallet({
  network: WalletConnectChainID.Mainnet,
  options: {
    relayUrl: 'wss://relay.walletconnect.com',
    projectId: '3df032a7fd3ff1938e7ea78354b088e4',
    metadata: {
      name: 'epl-sports',
      description: 'epl-sports WalletConnect Provider',
      url: 'https://www.epl-sports.com/',
      icons: ['https://www.epl-sports.com/logo.png']
    }
  },
  web3ModalConfig: {
    themeMode: 'dark',
    themeVariables: {
      '--w3m-z-index': 1000
    },
    /**
     * Recommended Wallets are fetched from WalletConnect explore api:
     * https://walletconnect.com/explorer?type=wallet&version=2.
     * You can copy these ids from the page.
     */ 
    explorerRecommendedWalletIds: [
      '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
      '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
      'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
      '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4'
    ]
  }
});