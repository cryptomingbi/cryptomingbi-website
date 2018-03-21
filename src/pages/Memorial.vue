<template lang="pug">
#memorial
  el-table(:data="cashes")
    el-table-column(prop="identity", label="发行编号")
    el-table-column(prop="address", label="烧钱人")
    el-table-column(prop="data", label="烧至")
</template>

<script>
import Wallet from '@/utils/wallet';

export default {
  name: 'Memorial',
  data() {
    return {
      wallet: new Wallet(this),
      ids: [],
      cashes: [],
    };
  },
  methods: {
    getMingbies() {
      this.wallet.contract.getMingbiBurnt((error, result) => {
        if (error) {
          this.$message({
            type: 'error',
            message: error,
          });
        } else {
          this.ids = result;
          if (this.ids.length > 0) {
            this.getDetail(0);
          }
        }
      });
    },
    getDetail(index) {
      this.wallet.contract.getMingbiDetail(this.ids[index], (error, result) => {
        if (error) {
          this.$message({
            type: 'error',
            message: error,
          });
        } else {
          this.cashes.push({
            identity: `冥第 ${this.ids[index].toString()} 号`,
            address: result[1],
            data: result[2],
          });
          if (index + 1 < this.ids.length) { this.getDetail(index + 1); }
        }
      });
    },
  },
  mounted() {
    this.getMingbies();
  },
};
</script>

<style lang="stylus" scoped>
</style>
