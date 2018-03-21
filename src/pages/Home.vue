<template lang="pug">
#home
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
