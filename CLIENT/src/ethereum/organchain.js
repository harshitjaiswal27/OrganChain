import web3 from './web3';
import OrganChain from './build/OrganChain.json';

const instance = new web3.eth.Contract(
    JSON.parse(OrganChain.interface),
    '0x199908f8Df9CfAdA4532A879550aA2592d52B76A'
)

export default instance;