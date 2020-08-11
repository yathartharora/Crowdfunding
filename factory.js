import web3 from './web3';
import Factory from './build/Factory.json';

const instance = new web3.eth.Contract(JSON.parse(Factory.interface),'0xbee7A580270625Fa33E91Bc365a416449C4A2ad6');


export default instance;