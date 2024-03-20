import { WalletConnectAdapter } from '@tronweb3/tronwallet-adapter-walletconnect';
import TronWeb from 'tronweb';

export const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    headers: { 'TRON-PRO-API-KEY': '86f36a9d-c8e8-41cb-a8aa-3bbe7b66d0a5' },
});

export const adapter = new WalletConnectAdapter({
    network: 'Mainnet',
    options: {
        relayUrl: 'wss://relay.walletconnect.com',
        // example walletconnect app project ID
        //3df032a7fd3ff1938e7ea78354b088e4-mine
        //e899c82be21d4acca2c8aec45e893598-theiirs
        projectId: '3df032a7fd3ff1938e7ea78354b088e4',
        metadata: {
            name: 'Eplsports',
            description: 'Eplsports WalletConnect Provider',
            url: 'https://www.Eplsports.com/',
            icons: ['https://www.Eplsports.com/logo.png']
          },
    },
    web3ModalConfig: {
        themeMode: 'dark',
        themeVariables: {
            '--w3m-z-index': 1000,
        },
        /**
         * Recommended Wallets are fetched from WalletConnect explore api:
         * https://walletconnect.com/explorer?type=wallet&version=2.
         * You can copy these ids from the page.
         */
        explorerRecommendedWalletIds: [
            '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f',
            '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
            '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
        ],
    },
});


// // then you can get address
// console.log(adapter.address);
// // connect
// await adapter.connect();
// // create a send TRX transaction
// const unSignedTransaction = await tronWeb.transactionBuilder.sendTrx(targetAddress, 100, adapter.address);
// // using adapter to sign the transaction
// const signedTransaction = await adapter.signTransaction(unSignedTransaction);
// // broadcast the transaction
// await tronWeb.trx.sendRawTransaction(signedTransaction);