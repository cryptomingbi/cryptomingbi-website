<template lang="pug">
#home
  h2
    | 『清明公告』
  p
    | 交易所系统已上线，采用去中心化点对点合约方案，除了付给矿工的 gas，合约不收取任何额外手续费。
  p
    | 交易合约已上以太坊主网，大约上午到中午间管线跑完并更新至全球 CDN 节点。
  p
    | 届时刷新页面即可进行交易，交易具体流程详见「冥币交易」页内介绍。
  img.post(src="/static/post.jpg")
</template>

<script>
import Wallet from '@/utils/wallet';

export default {
  name: 'Home',
  data() {
    return {
      wallet: new Wallet(this),
    };
  },
};
</script>

<style lang="stylus" scoped>
#home
  text-align center
.post
  width: 80%
</style>
