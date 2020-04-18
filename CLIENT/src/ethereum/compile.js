const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname,'contracts','OrganChain.sol');
const source = fs.readFileSync(contractPath,'Utf8');
const output = solc.compile(source,1).contracts;

fs.ensureDirSync(buildPath);

fs.outputJSONSync(path.resolve(buildPath, 'OrganChain.json'), output[':OrganChain']);
