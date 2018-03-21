import Web3 from 'web3';
import abi from '@/assets/abi.json';

export default class Wallet {
  constructor(instance) {
    this.instance = instance;
    if (typeof window.web3 !== 'undefined') {
      this.wallet = new Web3(window.web3.currentProvider);
    } else {
      instance.$message({
        type: 'error',
        message: '没有找到 Web3 提供者, 考虑一下安装 MetaMask 插件？',
      });
    }
    this.account = this.wallet.eth.accounts[0];
    this.wallet.eth.defaultAccount = this.account;
    const Contract = this.wallet.eth.contract(abi);
    this.contract = Contract.at('0x399468D1dC0d219CB9812B1e1a64acdf9B677a0a');
  }

  toWei(price) {
    return this.wallet.toWei(Number(price), 'ether');
  }

  toEther(price) {
    return this.wallet.fromWei(Number(price), 'ether');
  }
}
