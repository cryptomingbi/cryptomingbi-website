import Web3 from 'web3';
import MingbiAbi from '@/assets/MingbiAbi.json';
import TradeAbi from '@/assets/TradeAbi.json';

export default class Wallet {
  constructor(instance) {
    this.instance = instance;
    // Ropsten
    // this.tradeContractAddress = '0xc002c47484db1d53f98cc627cb60cc382382b689';
    // Main Network
    this.tradeContractAddress = '0xE88b99557dC720aC11c3F4ab5CB1Bfb1a6b930A2';
    // Ropsten
    // this.mingbiContractAddress = '0x2037a5581B4E975Ae0927C710b7E099425081FBB';
    // Main Network
    this.mingbiContractAddress = '0x399468D1dC0d219CB9812B1e1a64acdf9B677a0a';
    if (typeof window.web3 !== 'undefined') {
      this.wallet = new Web3(window.web3.currentProvider);
    } else {
      instance.$message({
        type: 'error',
        message: '没有找到 Web3 插件，无法交易, 考虑一下安装 MetaMask 插件？',
      });
    }
    if (this.wallet.eth.accounts.length === 0) {
      instance.$message({
        type: 'error',
        message: '您的 Web3 插件没有登录或注册钱包，尚不能使用交易功能。',
      });
    }
    this.account = this.wallet.eth.accounts[0];
    this.wallet.eth.defaultAccount = this.account;
    const Contract = this.wallet.eth.contract(MingbiAbi);
    const Trade = this.wallet.eth.contract(TradeAbi);
    this.tradeContract = Trade.at(this.tradeContractAddress);
    this.contract = Contract.at(this.mingbiContractAddress);
  }

  toWei(price) {
    return this.wallet.toWei(Number(price), 'ether');
  }

  toEther(price) {
    return this.wallet.fromWei(Number(price), 'ether');
  }
}
