import web3 from './web3';
import OrganChain from './build/OrganChain.json';

const instance = new web3.eth.Contract(
    JSON.parse(OrganChain.interface),
    '0x8d592B714D09298Eb61c6985ab96D2470E18bE68'
)

export default instance;