<template lang="pug">
el-menu.menu(router, :default-active="$route.path", :default-openeds="['/']", mode="horizontal")
  el-menu-item(index="/")
    span(slot="title")
      | 以太冥币
  el-menu-item(index="/home")
    span(slot="title")
      | 首页
  el-menu-item(index="/auction")
    span(slot="title")
      | 冥币发行
  el-menu-item(index="/my")
    span(slot="title")
      | 我的冥币
  el-menu-item(index="/memorial")
    span(slot="title")
      | 纪念堂
  el-menu-item(index="/trade")
    span(slot="title")
      b
        | 冥币交易（清明新上线）
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style lang="stylus" scoped>
.menu
  height 100%
</style>
