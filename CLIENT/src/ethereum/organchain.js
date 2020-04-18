import web3 from './web3';
import OrganChain from './build/OrganChain.json';

const instance = new web3.eth.Contract(
    JSON.parse(OrganChain.interface),
    '0xEC3f15ee47CC065a4AA8951350c52011632D94fB'
)

export default instance;