const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledOrganChain = require('./build/OrganChain.json')

const provider = new  HDWalletProvider(
    'monitor speak push thunder veteran alpha lobster loyal field deliver run salon',
    // '#PASTE YOUR ACCOUNT MNEMONIC SEED WORDS HERE#',
    'https://rinkeby.infura.io/v3/a02e8aeac81f41cca74aa1260ad4fde2'
);

const web3 = new Web3(provider);

const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy contract from account : ' , accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledOrganChain.interface))
    .deploy({ data : compiledOrganChain.bytecode })
    .send({ from : accounts[0] , gas : '10000000'});

    console.log('Contract deployed at address :',result.options.address);
};

deploy();

