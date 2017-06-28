<template>
  <div :class="{'isLogin': user.is_login}" class="head_top">
    <a href="/#/" class="top">header</a>
  </div>
</template>

<script>
  import Vuex from 'vuex'

  export default {
    data () {
      return {
      }
    },
    computed: Vuex.mapGetters({
      user: 'getUser'
    })
  }

</script>

<style lang="less" scoped>
  .head_top {
    position: fixed;
    height: 4rem;
    line-height: 4rem;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .isLogin {
    background: #000;
    text-align: center;
    .top {
      font-size: 18px;
      color: #fff;
    }
  }
</style>
