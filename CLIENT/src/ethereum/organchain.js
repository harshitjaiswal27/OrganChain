import web3 from './web3';
import OrganChain from './build/OrganChain.json';

const instance = new web3.eth.Contract(
    JSON.parse(OrganChain.interface),
    '0x39455f58763AF5515dF6a262Be5e19Ca17B1F53e'
)

export default instance;