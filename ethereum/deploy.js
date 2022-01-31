const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
// const { abi, bytecode } = require('./compile');
const compiledFactory = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider(
    'YOUR_METAMASK_MNEMONIC',       // mnemonic
    'https://rinkeby.infura.io/v3/e2bba5d09b8b41008aca98853adbbb22'                     // Infura Node API Endpoint to connect to the Rukeby Ethereum Network Node
)

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempemting to deploy  from account :' + accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(JSON.stringify(compiledFactory.abi)))
                    .deploy({ data: compiledFactory.evm.bytecode.object })
                    .send({ gas: '3000000', from: accounts[0] });
    
    // console.log(abi);
    
    console.log('Contract deployed to : ' + result.options.address);
};

const contractAddresGenerated = "0x2935216ce4d04f21e1a22771a377Ef993Cd68A65"

deploy();