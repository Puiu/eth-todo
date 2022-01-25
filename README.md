# Prerequisites
* NodeJs
* Truffle: https://www.trufflesuite.com/truffle
* Ganache: https://www.trufflesuite.com/ganache
* Web3.js: https://github.com/ChainSafe/web3.js
* Fastify https://www.fastify.io/docs/latest/Guides/Getting-Started/
* ethereumjs-tx https://github.com/ethereumjs/ethereumjs-tx
* Metamask Wallet: https://metamask.io/
* Infura account https://infura.io/
* HDWalletProvider: npm install @truffle/hdwallet-provider

# How tu run locally
* Make sure Ganache is up and running
* Run `truffle migrate --network development`

## Connect Metamask
* Create new Account on Metamask
* Connect to localhost 8545 -- change the port in ganache from 7545 to 8545 before connecting
* Import Ganache account
    * Open Ganache -- Accounts
    * Select the key from the address that has used eth and copy it
    * Paste the key in Metamask


# How to run on Rinkeby testnet
We use Rinkeby testnet for this project. You will need some "test" ethereum to pay for fees. You can get some here: https://faucets.chain.link/rinkeby; https://testnet.help/en/ethfaucet/rinkeby

Rinkeby testnet should already be available on the Metamask wallet.

To deploy to Rinkeby you just need to run `truffle migrate --network rinkeby` 

# Using the application
Create a **.secret** file under root folder. Write inside it the security phrase (12 words) of the Metamask wallet. **Be carefull with this! This can be used to gain access to your metamask wallet!**

Create a second file called **.secret-infura** under the api folder. Paste the Infura url inside the file. It should be something like this: https://rinkeby.infura.io/v3/8f8bf...

## Using the web application


Open a terminal and go under root folder. Run `npm run dev`

## Using the API
Open a terminal and go under **api** folder. Create 3 files:
* .secret-account -> paste in the account address from Metamask
* .secret-contract-addr -> paste in the contract address from the blockchain
* .secret-private-key -> Metamask Account private key; you can export it from Metamask -> Account details -> Export private key.

Open a terminal and navigate to the **api** folder. Run `node eth-api.js`. The API should be up and running.
