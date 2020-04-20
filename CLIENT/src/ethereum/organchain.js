import web3 from './web3';
import OrganChain from './build/OrganChain.json';

const instance = new web3.eth.Contract(
    JSON.parse(OrganChain.interface),
    '0x68975E457Fe287Ea6d92f7B729E9feE9E1220F98'
)

export default instance;