import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && window.ethereum !== 'undefined') {
    // in the browser and metamask is running
    web3 = new Web3(window.ethereum);    
    window.ethereum.request({ method: "eth_requestAccounts" });
} else {
    // We are not on server OR user os not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/e2bba5d09b8b41008aca98853adbbb22'
    );
    web3 = new Web3(provider);
}

export default web3;