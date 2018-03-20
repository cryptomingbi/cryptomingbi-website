<template lang="pug">
#app
  el-container
    el-header
      nav-header
    el-main
      router-view
</template>

<script>
import NavHeader from '@/components/NavHeader';

export default {
  name: 'App',
  components: {
    NavHeader,
  },
};
</script>

<style lang="stylus" scoped>
#app
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
</style>
