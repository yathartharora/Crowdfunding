const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

//Get the build folder and remove it
const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

//get the solidity source code path
const campaignPath = path.resolve(__dirname,'contract','campaign.sol');

//read the solidity code
const source = fs.readFileSync(campaignPath,'utf8');

//Compile the smart contract
const output = solc.compile(source,1).contracts;

//create a new build directory
fs.ensureDirSync(buildPath);


for (let c in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, c.replace(':','') + '.json' ),
        output[c]
    );
}
