<template lang="pug">
#my
  el-table(:data="mine")
    el-table-column(prop="identity", label="发行编号")
    el-table-column(label="操作")
      template(slot-scope="scope")
        el-button(size="mini", @click="transfer(scope.row.raw)")
          | 转账
        el-button(size="mini", type="danger", @click="burn(scope.row.raw)")
          | 燃烧
</template>

<script>
import Wallet from '@/utils/wallet';

export default {
  name: 'My',
  data() {
    return {
      wallet: new Wallet(this),
      mine: [],
    };
  },
  methods: {
    getMingbies() {
      this.wallet.contract.getMingbiByOwner(this.wallet.account, (error, result) => {
        if (error) {
          this.$message({
            type: 'error',
            message: error,
          });
        } else {
          this.mine = []; // clear up
          result.forEach((val) => {
            this.mine.push({
              identity: `冥第 ${val.toString()} 号`,
              raw: val,
            });
          });
        }
      });
    },
    transfer(id) {
      this.$prompt('请输入转账对象地址', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.wallet.contract.transfer(value, id, (error, result) => {
          if (error) {
            this.$message({
              type: 'error',
              message: error,
            });
          } else {
            this.$message({
              type: 'info',
              message: `已请求 ${result}`,
            });
          }
        });
      }).catch(() => {
      });
    },
    burn(id) {
      this.$prompt('请输入要烧的对象', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.wallet.contract.burn(id, value, (error, result) => {
          if (error) {
            this.$message({
              type: 'error',
              message: error,
            });
          } else {
            this.$message({
              type: 'info',
              message: `已请求 ${result}`,
            });
          }
        });
      }).catch(() => {
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
