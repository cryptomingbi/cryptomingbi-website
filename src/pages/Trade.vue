<template lang="pug">
#trade
  h5
    | 冥币交易自由。请先在「我的冥币」中确认已授权交易，否则交易所无法导入冥币。
  h5
    | 授权后在此点击「挂单」，输入编号和价格，提交即可。
  h5
    | 采用去中心化点对点合约方案，除了付给矿工的 gas，合约不收取任何额外手续费。
  el-button(type="primary", size="medium", @click="showDialog=true")
    | 挂单
  el-table(:data="trading")
    el-table-column(prop="identity", label="发行编号")
    el-table-column(prop="price", label="价格")
    el-table-column(prop="owner", label="卖家")
    el-table-column(label="操作")
      template(slot-scope="scope")
        el-button(size="mini", @click="buy(scope.row.raw, scope.row.priceRaw)")
          | 购买
        el-button(size="mini", type="danger", @click="revoke(scope.row.raw)")
          | 撤回
  el-dialog(:visible.sync="showDialog")
    el-form(:model="form")
      el-form-item(label="冥币编号", label-width="100px")
        el-input-number(v-model="form.id", :min="1", :max="10000000")
      el-form-item(label="挂单价格", label-width="100px")
        el-input-number(v-model="form.price", :min="0.001", :max="10000", :step="0.001")
      el-form-item(label="操作", label-width="100px")
        el-button(type="danger", @click="sell()")
          | 挂单
</template>

<script>
import Wallet from '@/utils/wallet';

export default {
  data() {
    return {
      wallet: new Wallet(this),
      showDialog: false,
      form: {
        id: 1,
        price: 0.001,
      },
      trading: [],
    };
  },
  methods: {
    sell() {
      this.showDialog = false;
      this.wallet.tradeContract.sell(
        this.form.id,
        this.wallet.toWei(this.form.price),
        (error, result) => {
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
    },
    buy(id, price) {
      this.$confirm('确认购买这张冥币吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.wallet.tradeContract.buy(id, {
          value: price,
          gas: 220000,
          gasPrice: 1000000000 * 20,
        }, (error, result) => {
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
    revoke(id) {
      this.$confirm('确认撤回挂单吗？（只有卖家可以操作）', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.wallet.tradeContract.revoke(id, (error, result) => {
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
    this.wallet.tradeContract.list((error, result) => {
      if (error) {
        this.$message({
          type: 'error',
          message: error,
        });
      } else {
        for (let i = 0; i < result[0].length; i += 1) {
          this.trading.push({
            identity: `冥第 ${result[0][i].toString()} 号`,
            price: `${this.wallet.toEther(result[1][i])} ETH`,
            owner: result[2][i].toString(),
            priceRaw: result[1][i],
            raw: result[0][i],
          });
        }
      }
    });
  },
};
</script>
