import web3 from './web3';
import OrganChain from './build/OrganChain.json';

const instance = new web3.eth.Contract(
    JSON.parse(OrganChain.interface),
    '0x4Fdbb0Fa698a5456497c743135a8726e53877459'
)

export default instance;