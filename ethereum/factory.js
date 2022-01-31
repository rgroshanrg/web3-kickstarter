import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(JSON.stringify(CampaignFactory.abi)),
    '0x0c231CE69D24d2d26BD3CeA65f66e4D6964A005B'
)

export default instance;
