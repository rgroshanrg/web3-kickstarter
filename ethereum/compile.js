const path = require('path');
const mocha = require('mocha');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const camapignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(camapignPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol'];

// console.log(output);

// fs.ensureDirSync(buildPath);

// path.resolve(buildPath, contract)

for(let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract + '.json'),
        output[contract]
    );
    // console.log(contract);
    // console.log("--------------------------------------------------------------------------------------------------------------------------------------------------");
}