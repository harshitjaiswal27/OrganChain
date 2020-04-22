import web3 from './web3';
import OrganChain from './build/OrganChain.json';

const instance = new web3.eth.Contract(
    JSON.parse(OrganChain.interface),
    '0xDf15515F98Cf8Ed12B6152B67a1dcc98990b9DB3'
)

export default instance;